import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./input";

it("Check Input can be entered", () => {
  const type = "text";
  const placeholder = "enter username";
  const value = "viz";
  render(<Input type={type} placeholder={placeholder} />);
  const inputElement = screen.getByPlaceholderText(placeholder);
  fireEvent.change(inputElement, {
    target: { value: value },
  });
  expect(inputElement).toHaveValue(value);
});
