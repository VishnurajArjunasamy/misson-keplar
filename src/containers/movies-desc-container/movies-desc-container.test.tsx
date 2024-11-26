import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoviesDescContainer from "./movies-desc-container";


it("Check Movie description container renders", () => {
  render(<MoviesDescContainer/>);

  expect(screen.queryAllByRole("img")).toHaveLength(2);
});
