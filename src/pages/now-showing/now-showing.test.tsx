import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NowShowing from "./now-showing";


jest.mock("../../components/video/video", () => {
  return React.forwardRef<HTMLVideoElement, { src: string; poster: string }>(
    ({ src, poster }, ref) => (
      <video data-testid="video" src={src} poster={poster} ref={ref}>
        Mock Video Component
      </video>
    )
  );
});

jest.mock(
  "../../components/video-controls/play-pause-btn/play-pause-btn",
  () => {
    return ({ type }: { type: string }) => (
      <button data-testid="play-pause-btn">
        {type === "play" ? "Play" : "Pause"}
      </button>
    );
  }
);

describe("NowShowing Component", () => {
  test("renders NowShowing component correctly", () => {
    render(<NowShowing />);
    const heading = screen.getByText("Now Showing");
    expect(heading).toBeInTheDocument();

    const trailerTitle = screen.getByText("Sintel");
    expect(trailerTitle).toBeInTheDocument();

    const video = screen.getByTestId("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute(
      "src",
      "https://tympanus.net/Development/SeatPreview/media/sintel.mp4"
    );

    const trailerDescription = screen.getByText(/Sintel tells the story/i);
    expect(trailerDescription).toBeInTheDocument();

    const btn = screen.getByTestId("play-pause-btn");
    expect(btn).toBeInTheDocument();
  });

  test("toggles play and pause states when the button is clicked", () => {
    const mockPlay = jest.fn();
    const mockPause = jest.fn();

    render(<NowShowing />);

    const video = screen.getByTestId("video") as HTMLVideoElement;

    Object.defineProperty(video, "play", { value: mockPlay });
    Object.defineProperty(video, "pause", { value: mockPause });

    let playPauseBtn = screen.getByTestId("play-pause-btn");

    fireEvent.click(playPauseBtn);
    expect(mockPlay).toHaveBeenCalled();
    playPauseBtn = screen.getByTestId("play-pause-btn");
  });
});
