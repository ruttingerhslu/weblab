import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode");

const mockNavigate = jest.fn();
jest.mock("react-router", () => {
  const original = jest.requireActual("react-router");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("Navbar", () => {
  const renderWithRouter = (ui) =>
    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>,
    );

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("logs out and navigates to /login", async () => {
    const user = userEvent.setup();
    localStorage.setItem("token", "fake-token");
    jwtDecode.mockReturnValue({ role: "admin", exp: Date.now() / 1000 + 1000 });

    renderWithRouter(<Navbar />);

    const logoutButton = screen.getByLabelText("logout");
    await user.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
