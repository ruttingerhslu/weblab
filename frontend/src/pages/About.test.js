import { render, screen } from "@testing-library/react";
import About from "./About";
import { MemoryRouter } from "react-router";
import React from "react";

describe("About Page", () => {
  test("renders heading, content, link, and Navbar", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", { name: /About/i });
    expect(heading).toBeInTheDocument();

    expect(
      screen.getByText(
        /A Technology Radar is a tool that helps organizations/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /The goal is to guide teams in choosing the right tools/i,
      ),
    ).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: /ThoughtWorks Technology Radar/i,
    });
    expect(link).toHaveAttribute("href", "https://www.thoughtworks.com/radar");
  });
});
