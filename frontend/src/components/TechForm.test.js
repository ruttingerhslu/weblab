import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addTechnology, updateTechnology } from "../api/technology";
import TechForm from "./TechForm";

jest.mock("../api/technology", () => ({
  addTechnology: jest.fn(),
  updateTechnology: jest.fn(),
}));

describe("TechForm", () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    localStorage.setItem("token", "abc123");
    jest.clearAllMocks();
  });

  afterAll(() => {
    window.alert.mockRestore();
  });

  it("renders the form with title", () => {
    render(<TechForm title="Add Technology" onSuccess={mockOnSuccess} />);

    expect(screen.getByText("Add Technology")).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maturity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/classification/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/publish technology/i)).toBeInTheDocument();
  });

  it("updates form values on input change", async () => {
    const user = userEvent.setup();
    render(<TechForm title="Add Technology" onSuccess={mockOnSuccess} />);

    await user.type(screen.getByLabelText(/name/i), "React");
    await user.click(screen.getByLabelText(/publish technology/i));

    expect(screen.getByLabelText(/name/i)).toHaveValue("React");
    expect(screen.getByLabelText(/publish technology/i)).toBeChecked();
  });

  it("submits new technology via addTechnology", async () => {
    const user = userEvent.setup();
    addTechnology.mockResolvedValueOnce({});

    render(<TechForm title="Add Technology" onSuccess={mockOnSuccess} />);

    await user.type(screen.getByLabelText(/name/i), "React");
    await user.click(screen.getByLabelText(/publish technology/i));
    await user.click(screen.getByLabelText(/category/i));
    await user.click(screen.getByText("Tools"));
    await user.click(screen.getByLabelText(/maturity/i));
    await user.click(screen.getByText("Adopt"));
    await user.type(screen.getByLabelText(/description/i), "UI library");
    await user.type(
      screen.getByLabelText(/classification/i),
      "Established and well documented",
    );

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(addTechnology).toHaveBeenCalledTimes(1);
    expect(addTechnology).toHaveBeenCalledWith("abc123", {
      name: "React",
      category: "Tools",
      maturity: "Adopt",
      description: "UI library",
      classification: "Established and well documented",
      publish: true,
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it("submits existing technology via updateTechnology", async () => {
    const user = userEvent.setup();
    updateTechnology.mockResolvedValueOnce({});

    const initialData = {
      _id: "1",
      name: "React",
      category: "Tools",
      maturity: "Adopt",
      description: "UI library",
      classification: "Established and well documented",
    };

    render(
      <TechForm
        title="Edit Technology"
        initialData={initialData}
        onSuccess={mockOnSuccess}
      />,
    );

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(updateTechnology).toHaveBeenCalledTimes(1);
    expect(updateTechnology).toHaveBeenCalledWith("abc123", "1", {
      ...initialData,
      publish: false,
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });
});
