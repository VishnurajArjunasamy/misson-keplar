import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Img from "./Img";

it("Image should be rendered with the src", () => {
  const imgSrc = "../../assets/images/sindel-background.png";
  render(<Img src={imgSrc} />);
  const imgElement = screen.getByRole("img");
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute("src", imgSrc);
});
