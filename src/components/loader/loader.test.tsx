import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Loader } from "./loader";

describe("Loader Component", () => {
  it("renders the loader correctly", () => {
    render(<Loader />);

    const spinner = screen.getByTestId("loader");
    expect(spinner).toBeInTheDocument();

    expect(spinner).toHaveClass("spinner");
  });
});
