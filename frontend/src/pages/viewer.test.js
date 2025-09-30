import { render, screen, waitFor } from "@testing-library/react";
import { getPublishedTechnologies } from "../api/technology";
import { transformTechnologies } from "../utils/transform";

/* eslint-disable import/first */
jest.mock("../api/technology", () => ({
  getPublishedTechnologies: jest.fn(),
}));
jest.mock("../utils/transform", () => ({
  transformTechnologies: jest.fn(),
}));
import Viewer from "./viewer";
/* eslint-enable import/first */

jest.mock("../components/TechRadar.js", () => () => (
  <div data-testid="tech-radar">Mock TechRadar</div>
));

jest.mock("../components/Navbar", () => () => (
  <div data-testid="navbar">Mock Navbar</div>
));

describe("Viewer", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders Navbar", () => {
    render(<Viewer />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("fetches and transforms technologies, stores them in localStorage", async () => {
    const mockToken = "abc123";
    const mockData = [{ _id: "1", name: "React" }];
    const mockTransformed = [{ _id: "1", label: "React" }];

    localStorage.setItem("token", mockToken);
    getPublishedTechnologies.mockResolvedValueOnce(mockData);
    transformTechnologies.mockReturnValueOnce(mockTransformed);

    render(<Viewer />);

    await waitFor(() =>
      expect(getPublishedTechnologies).toHaveBeenCalledWith(mockToken),
    );
    await waitFor(() =>
      expect(transformTechnologies).toHaveBeenCalledWith(mockData),
    );
    await waitFor(() =>
      expect(localStorage.getItem("technologies")).toEqual(
        JSON.stringify(mockData),
      ),
    );

    expect(await screen.findByTestId("tech-radar")).toBeInTheDocument();
  });

  it("handles invalid cached technologies gracefully", () => {
    localStorage.setItem("technologies", "{ invalid json");

    render(<Viewer />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });
});
