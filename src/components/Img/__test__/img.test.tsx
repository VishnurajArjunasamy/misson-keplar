import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Img from "../img";

describe("Img Component", () => {
  it("renders correctly with provided src and alt", () => {
    const { asFragment } = render(
      <Img src="https://example.com/image.jpg" alt="Test Image" />
    );
    const img = screen.getByAltText("Test Image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(asFragment()).toMatchSnapshot();
  });

  it("falls back to emptyUser image for user images on error", () => {
    const { asFragment } = render(
      <Img src="invalid-src" alt="User Image" isUser={true} />
    );
    const img = screen.getByAltText("User Image");

    // Simulate image load error
    fireEvent.error(img);

    expect(img).toHaveAttribute("src", expect.stringContaining("test-file-stub"));
    expect(asFragment()).toMatchSnapshot();
  });

  it("falls back to placeholder blog image for non-user images on error", () => {
    const { asFragment } = render(
      <Img src="invalid-src" alt="Blog Image" isUser={false} />
    );
    const img = screen.getByAltText("Blog Image");

    // Simulate image load error
    fireEvent.error(img);

    expect(img).toHaveAttribute("src", expect.stringContaining("test-file-stub"));
    expect(asFragment()).toMatchSnapshot();
  });

  it("uses default alt text when alt is not provided", () => {
    const { asFragment } = render(
      <Img src="https://example.com/image.jpg" />
    );
    const img = screen.getByAltText("image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(asFragment()).toMatchSnapshot();
  });
});
