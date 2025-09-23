import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App";

jest.mock("./components/ProtectedRoute", () => {
  return ({ children }) => <>{children}</>;
});

jest.mock("./pages", () => () => <div>Home Page</div>);
jest.mock("./pages/admin", () => () => <div>Admin Page</div>);
jest.mock("./pages/login", () => () => <div>Login Page</div>);
jest.mock("./pages/viewer", () => () => <div>Viewer Page</div>);

jest.mock("./components/ProtectedRoute", () => {
  const { Outlet } = jest.requireActual("react-router");
  return function ProtectedRoute({ roles }) {
    const testUserRole = "admin";

    if (!roles.includes(testUserRole)) return <div>Access Denied</div>;
    return <Outlet />;
  };
});

describe("App routing", () => {
  test("renders Home page on default route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders Login page on /login", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("renders Admin page on /admin", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Admin Page")).toBeInTheDocument();
  });

  test("renders Viewer page on /viewer", () => {
    render(
      <MemoryRouter initialEntries={["/viewer"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Viewer Page")).toBeInTheDocument();
  });
});
