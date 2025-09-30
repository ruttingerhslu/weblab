import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Admin from "./admin";
import { getTechnologies, deleteTechnology } from "../api/technology";

jest.mock("../api/technology", () => ({
  getTechnologies: jest.fn(),
  deleteTechnology: jest.fn(),
}));

jest.mock("../components/Navbar", () => () => (
  <div data-testid="navbar">Mock Navbar</div>
));

jest.mock(
  "../components/TechList",
  () =>
    ({ technologies, handleEdit, handleDelete }) => (
      <div>
        {technologies.map((t) => (
          <div key={t._id} data-testid="tech-item">
            {t.name}
            <button onClick={() => handleEdit(t)}>Edit</button>
            <button onClick={() => handleDelete(t)}>Delete</button>
          </div>
        ))}
      </div>
    ),
);

jest.mock(
  "../components/TechForm",
  () =>
    ({ initialData, title, onSuccess }) => (
      <div>
        <div data-testid="tech-form">{title}</div>
        <button onClick={onSuccess}>Save</button>
      </div>
    ),
);

describe("Admin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders navbar and dashboard title", async () => {
    getTechnologies.mockResolvedValueOnce([
      { _id: "1", name: "React", publishedAt: null },
    ]);

    render(<Admin />);

    expect(await screen.findByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
  });

  it("fetches and displays technologies", async () => {
    getTechnologies.mockResolvedValueOnce([
      { _id: "1", name: "React", publishedAt: "2025-01-01" },
      { _id: "2", name: "Rust", publishedAt: null },
    ]);

    render(<Admin />);

    const items = await screen.findAllByTestId("tech-item");
    expect(items).toHaveLength(2);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Rust")).toBeInTheDocument();
  });

  it("opens edit dialog with selected technology", async () => {
    getTechnologies.mockResolvedValueOnce([
      { _id: "1", name: "React", publishedAt: null },
    ]);

    render(<Admin />);

    const editButton = await screen.findByText("Edit");
    await userEvent.click(editButton);

    expect(screen.getByTestId("tech-form")).toHaveTextContent(
      "Edit Technology",
    );
  });

  it("handles delete confirmation flow", async () => {
    getTechnologies.mockResolvedValue([
      { _id: "1", name: "React", publishedAt: null },
    ]);
    deleteTechnology.mockResolvedValueOnce({});

    render(<Admin />);

    const deleteButton = await screen.findByText("Delete");
    await userEvent.click(deleteButton);

    expect(await screen.findByText(/are you sure/i)).toBeInTheDocument();

    // Confirm deletion
    const confirmButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteTechnology).toHaveBeenCalledWith(null, "1"); // token = null, id = "1"
    });
  });

  it("cancels delete dialog", async () => {
    getTechnologies.mockResolvedValue([
      { _id: "1", name: "React", publishedAt: null },
    ]);

    render(<Admin />);

    const deleteButton = await screen.findByText("Delete");
    await userEvent.click(deleteButton);

    expect(await screen.findByText(/are you sure/i)).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText(/are you sure/i)).not.toBeInTheDocument();
    });
  });
});
