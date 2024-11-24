import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThumbsUp from "./thumbs-up";

it("Thumbs up image should be rendered", () => {
  render(<ThumbsUp onClick={() => {}} />);
  const imgElement = screen.getByRole("img");
  expect(imgElement).toBeInTheDocument();
});
