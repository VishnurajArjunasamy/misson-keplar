import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Img from "./Img";

const imgSrc = "../../assets/images/sindel-background.png";

jest.mock("../../assets/empty-image.png", () => "empty-image-mock.png");


describe("Img Component", () => {
  test("renders correctly with a valid src", () => {
    render(<Img src={imgSrc} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", imgSrc);
    expect(img).toHaveAttribute("alt", "Movie");
    expect(img).toHaveClass("img-style");
  });

  test("replaces src with emptyImage when an error occurs", () => {
    render(<Img src="broken-image.png" />);
    const img = screen.getByRole("img");
    fireEvent.error(img);
    expect(img).toHaveAttribute("src", "empty-image-mock.png");
  });
});
