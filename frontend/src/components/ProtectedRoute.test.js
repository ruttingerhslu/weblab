import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode");

describe("ProtectedRoute", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  const renderWithRouter = (ui, { initialEntries = ["/"] } = {}) =>
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>{ui}</Routes>
      </MemoryRouter>,
    );

  it("redirects to /login if no token", () => {
    renderWithRouter(
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<div>Outlet</div>} />
      </Route>,
    );

    expect(screen.queryByText("Outlet")).not.toBeInTheDocument();
  });

  it("redirects to /forbidden if role is not allowed", () => {
    const fakeToken = "abc123";
    localStorage.setItem("token", fakeToken);
    jwtDecode.mockReturnValue({ role: "user", exp: Date.now() / 1000 + 1000 });

    renderWithRouter(
      <Route path="/" element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/" element={<div>Outlet</div>} />
      </Route>,
    );

    expect(screen.queryByText("Outlet")).not.toBeInTheDocument();
  });

  it("renders Outlet if token is valid and role allowed", () => {
    const fakeToken = "abc123";
    localStorage.setItem("token", fakeToken);
    jwtDecode.mockReturnValue({ role: "admin", exp: Date.now() / 1000 + 1000 });

    renderWithRouter(
      <Route path="/" element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/" element={<div>Outlet</div>} />
      </Route>,
    );

    expect(screen.getByText("Outlet")).toBeInTheDocument();
  });
});
