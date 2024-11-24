import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LotteryInput from "./lottery-input";

it("Check Input can be entered", () => {
  const value = 7890123456;
  const placeholder='Enter Mobile Number'
  render(<LotteryInput />);
  const inputElement = screen.getByPlaceholderText(placeholder);
  fireEvent.change(inputElement, {
    target: { value: value },
  });
  expect(inputElement).toHaveValue(value);
});
