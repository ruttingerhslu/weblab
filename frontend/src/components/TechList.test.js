import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TechList from "./TechList";

const technologies = [
  { _id: "1", name: "React" },
  { _id: "2", name: "Vue" },
];

describe("TechList", () => {
  it("renders all technology names", () => {
    render(
      <TechList
        technologies={technologies}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  it("calls handleEdit when Edit button is clicked", async () => {
    const user = userEvent.setup();
    const handleEdit = jest.fn();

    render(
      <TechList
        technologies={technologies}
        handleEdit={handleEdit}
        handleDelete={() => {}}
      />,
    );

    const reactEditButton = screen.getByLabelText("edit React");
    await user.click(reactEditButton);

    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(technologies[0]);
  });

  it("calls handleDelete when Delete button is clicked", async () => {
    const user = userEvent.setup();
    const handleDelete = jest.fn();

    render(
      <TechList
        technologies={technologies}
        handleEdit={() => {}}
        handleDelete={handleDelete}
      />,
    );

    const vueDeleteButton = screen.getByLabelText("delete Vue");
    await user.click(vueDeleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(technologies[1]);
  });
});
