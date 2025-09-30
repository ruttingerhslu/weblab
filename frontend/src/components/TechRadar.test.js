import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TechRadar from "./TechRadar";

describe("TechRadar", () => {
  const entries = [
    {
      _id: "1",
      label: "React",
      quadrant: 0,
      ring: 0,
      description: "A UI library",
      classification: "Established and well documented",
      publishedAt: "2025-09-30T00:00:00Z",
    },
    {
      _id: "2",
      label: "Node.js",
      quadrant: 1,
      ring: 1,
    },
  ];

  it("renders without crashing and displays blips", () => {
    render(<TechRadar entries={entries} />);

    const radar = screen.getByRole("button", {
      name: /more info about react/i,
    });
    expect(radar).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /more info about node\.js/i }),
    ).toBeInTheDocument();
  });

  it("opens popover when a blip is clicked", async () => {
    render(<TechRadar entries={entries} />);
    const user = userEvent.setup();

    const reactBlip = screen.getByRole("button", {
      name: /more info about react/i,
    });
    await user.click(reactBlip);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText(/A UI library/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Established and well documented/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Published:/i)).toBeInTheDocument();
    expect(screen.getByText(/Quadrant:/i)).toBeInTheDocument();
    expect(screen.getByText(/Ring:/i)).toBeInTheDocument();
  });
});
