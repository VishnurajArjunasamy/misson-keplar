import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../button";

describe("Button Component", () => {
  it("renders the button with the provided label", () => {
    const { asFragment } = render(<Button label="Click Me" />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies the default type 'button' if no type is provided", () => {
    const { asFragment } = render(<Button label="Click Me" />);

    const button = screen.getByText("Click Me");
    expect(button).toHaveAttribute("type", "button");

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies the provided type attribute", () => {
    const { asFragment } = render(<Button label="Submit" type="submit" />);

    const button = screen.getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");

    expect(asFragment()).toMatchSnapshot();
  });

  it("calls the onClick function when clicked", () => {
    const handleClick = jest.fn();

    const { asFragment } = render(
      <Button label="Click Me" onClick={handleClick} />
    );

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
