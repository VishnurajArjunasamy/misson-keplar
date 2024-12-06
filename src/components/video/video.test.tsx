import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Video from "./video";
import { VideoRefIF } from "../../modals/videoModal";
import React from "react";

jest.mock("../../modals/videoModal", () => ({
  VideoRefIF: jest.fn(),
}));

test("Video component renders and exposes methods correctly", () => {
  const videoProps = {
    src: "test-video-url.mp4",
    poster: "test-poster-image.jpg",
  };

  const videoRef = React.createRef<VideoRefIF>();

  render(<Video {...videoProps} ref={videoRef} />);

  const videoElement = screen.getByTestId("video-element");
  expect(videoElement).toBeInTheDocument();
  expect(videoElement).toHaveAttribute("src", videoProps.src);
  expect(videoElement).toHaveAttribute("poster", videoProps.poster);
});
