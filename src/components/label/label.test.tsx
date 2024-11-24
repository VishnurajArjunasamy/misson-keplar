import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Label from "./label";

it("Check label has a value", () => {
  const value = "Name";

  render(<Label htmlFor={value} name={value} />);

  const labelElement = screen.getByText(value);
  expect(labelElement).toBeInTheDocument();
});
