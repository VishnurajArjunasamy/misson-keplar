import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "../not-found";

describe("Not found component", () => {
  it("renders not found component", () => {
    const { asFragment } = render(<NotFound />);

    expect(screen.getByText("YOU LOST?")).toBeInTheDocument();
    expect(screen.getByText("YOU LOST?").parentNode).toHaveClass("notFound");

    expect(asFragment()).toMatchSnapshot();
  });
});
