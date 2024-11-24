import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Video from "./video";

const TestComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const src = "sample.video.com";
  const poster = "sample.potser.com";
  return <Video  src={src} poster={poster} ref={videoRef} />;
};

it("Check if video componenet renders", () => {
  render(<TestComponent />);
//   const videoElement = screen.getByRole("video");
//   expect(videoElement).toBeInTheDocument();
//   expect(videoElement).toHaveAttribute("src", "example.mp4");
//   expect(videoElement).toHaveAttribute("poster", "example.jpg");
});
