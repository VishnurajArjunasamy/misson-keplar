import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./button";

describe("Button Component", () => {
  test("onClick should be called on button click", () => {
    const onClick = jest.fn();
    const buttonText = "Click";

    render(
      <Button size="lg" onClick={onClick}>
        {buttonText}
      </Button>
    );

    const btnElement = screen.getByText(buttonText);

    fireEvent.click(btnElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
