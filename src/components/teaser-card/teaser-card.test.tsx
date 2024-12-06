import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TCard } from "./teaser-card";
import Video from "../video/video";

// test("renders TCard component", () => {
//   render(
//     <TCard
//       teaserData={mockTeaserData}
//       nowPlaying={nowPlaying}
//       setNowPlaying={jest.fn()}
//       timer={'00 : 00'}
//       startTimer={jest.fn()}
//       stopTimer={jest.fn()}
//       seconds={10}
//       setSeconds={jest.fn()}
//     />
//   );

//   expect(screen.getByText("Mock Movie")).toBeInTheDocument();
// });

jest.mock("../../helper/withAdvertisement", () => ({
  withAdvertisement: (Component: { Component: React.ReactNode }) => Component,
}));

jest.mock("../../utils/adsUtils", () => ({
  getRandomShortAd: jest.fn(() => "mockAdImage.jpg"),
}));

describe("TeaserCard Component", () => {
  const mockTeaserData = {
    id: "1",
    videoUrl: "mockVideo.mp4",
    posterImg: "mockPoster.jpg",
    movieName: "Mock Movie",
  };

  const nowPlaying = {
    teaser_1: false,
    teaser_2: false,
    teaser_3: false,
  };

  const mockSetNowPlaying = jest.fn();
  const mockStartTimer = jest.fn();
  const mockStopTimer = jest.fn();
  const mockSetSeconds = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders teaser card with video and poster", () => {
    render(
      <TCard
        teaserData={mockTeaserData}
        nowPlaying={nowPlaying}
        setNowPlaying={mockSetNowPlaying}
        timer={"00:01"}
        startTimer={mockStartTimer}
        stopTimer={mockStopTimer}
        seconds={10}
        setSeconds={mockSetSeconds}
      />
    );
    const videoElement = screen.getByTestId("video-element");
    expect(videoElement).toHaveAttribute("src", "mockVideo.mp4");
    expect(screen.getByText("Mock Movie")).toBeInTheDocument();
  });

  test("toggles video play/pause on button click", () => {
    jest.mock("../video/video.tsx", () => {
      return jest
        .fn()
        .mockImplementation(() => <div data-testid="play-btn">play</div>);
    });
    render(
      <TCard
        teaserData={mockTeaserData}
        nowPlaying={nowPlaying}
        setNowPlaying={mockSetNowPlaying}
        timer={"04:01"}
        startTimer={mockStartTimer}
        stopTimer={mockStopTimer}
        seconds={10}
        setSeconds={mockSetSeconds}
      />
    );
    const playButton = screen.getByTestId("play-pause-btn");
    fireEvent.click(playButton);
    expect(mockSetNowPlaying).toHaveBeenCalled();
    expect(mockStartTimer).toHaveBeenCalled();
  });

  test("displays ad when timer reaches zero", () => {
    const { rerender } = render(
      <TCard
        teaserData={mockTeaserData}
        nowPlaying={nowPlaying}
        setNowPlaying={mockSetNowPlaying}
        timer={"00:10"}
        startTimer={mockStartTimer}
        stopTimer={mockStopTimer}
        seconds={10}
        setSeconds={mockSetSeconds}
      />
    );

    const playBtn = screen.getByTestId('play-pause-btn');
    fireEvent.click(playBtn)

    rerender(
      <TCard
        teaserData={mockTeaserData}
        nowPlaying={nowPlaying}
        setNowPlaying={mockSetNowPlaying}
        timer={"00:10"}
        startTimer={mockStartTimer}
        stopTimer={mockStopTimer}
        seconds={0}
        setSeconds={mockSetSeconds}
      />
    );
  
    const adImage = screen.getByRole("img");
    expect(adImage).toBeInTheDocument();
  });

  test("renders correct timer messages", () => {
    const { rerender } = render(
      <TCard
        teaserData={mockTeaserData}
        nowPlaying={nowPlaying}
        setNowPlaying={mockSetNowPlaying}
        timer={"00:10"}
        startTimer={mockStartTimer}
        stopTimer={mockStopTimer}
        seconds={10}
        setSeconds={mockSetSeconds}
      />
    );
    const playBtn = screen.getByTestId('play-pause-btn');
    fireEvent.click(playBtn)
    expect(screen.getByText("Advertisement in 00:10")).toBeInTheDocument();

    // Rerender for ad
    rerender(
      <TCard
        teaserData={mockTeaserData}
        nowPlaying={nowPlaying}
        setNowPlaying={mockSetNowPlaying}
        timer={"00:10"}
        startTimer={mockStartTimer}
        stopTimer={mockStopTimer}
        seconds={0}
        setSeconds={mockSetSeconds}
      />
    );
    // fireEvent.click(playBtn)


    // expect(screen.getByText("Video in 00:10")).toBeInTheDocument();
  });

  test("pauses video when ad starts", () => {
    render(
      <TCard
        teaserData={mockTeaserData}
        nowPlaying={nowPlaying}
        setNowPlaying={mockSetNowPlaying}
        timer={"00:10"}
        startTimer={mockStartTimer}
        stopTimer={mockStopTimer}
        seconds={0}
        setSeconds={mockSetSeconds}
      />
    );
    expect(mockStopTimer).toHaveBeenCalled();
  });
});
