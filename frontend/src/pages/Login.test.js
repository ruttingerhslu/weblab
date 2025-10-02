import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { login } from "../api/auth";
import { isTokenValid, getUserRole } from "../utils/jwt";
import Login from "./Login";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("../api/auth", () => ({
  login: jest.fn(),
}));
jest.mock("../utils/jwt", () => ({
  isTokenValid: jest.fn(),
  getUserRole: jest.fn(),
}));

global.alert = jest.fn();

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it("redirects if valid token exists", () => {
    localStorage.setItem("token", "valid-token");
    isTokenValid.mockReturnValue(true);
    getUserRole.mockReturnValue("admin");

    render(<Login />);

    expect(isTokenValid).toHaveBeenCalledWith("valid-token");
    expect(getUserRole).toHaveBeenCalledWith("valid-token");
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  it("does not redirect if no valid token", () => {
    localStorage.setItem("token", "expired");
    isTokenValid.mockReturnValue(false);

    render(<Login />);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("logs in successfully and redirects to viewer", async () => {
    login.mockResolvedValueOnce({ token: "user-token" });
    getUserRole.mockReturnValue("user");

    render(<Login />);

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    await userEvent.type(emailField, "test@example.com");
    await userEvent.type(passwordField, "secret");

    const button = screen.getByRole("button", { name: /sign in/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "secret",
      });
    });
    expect(localStorage.getItem("token")).toBe("user-token");
    expect(mockNavigate).toHaveBeenCalledWith("/viewer");
  });

  it("logs in successfully and redirects to admin", async () => {
    login.mockResolvedValueOnce({ token: "admin-token" });
    getUserRole.mockReturnValue("admin");

    render(<Login />);

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    await userEvent.type(emailField, "admin@example.com");
    await userEvent.type(passwordField, "adminpass");

    const button = screen.getByRole("button", { name: /sign in/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(login).toHaveBeenCalled();
    });
    expect(localStorage.getItem("token")).toBe("admin-token");
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  it("shows alert if login fails", async () => {
    login.mockRejectedValueOnce(new Error("invalid"));

    render(<Login />);

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    await userEvent.type(emailField, "bad@example.com");
    await userEvent.type(passwordField, "wrong");

    const button = screen.getByRole("button", { name: /sign in/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Invalid credentials");
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
