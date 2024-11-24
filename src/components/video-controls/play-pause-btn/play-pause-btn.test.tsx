import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlayPauseBtn from "./play-pause-btn";

it("Check label has a value", () => {
  render(<PlayPauseBtn type={"pause"} onClick={() => {}} />);

  const bntElement = screen.getByRole("img");
  expect(bntElement).toBeInTheDocument();
});
