import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TCard } from "./teaser-card";

test("renders TCard component", () => {
  const mockTeaserData = {
    id: "1",
    videoUrl: "https://example.com/video.mp4",
    posterImg: "https://example.com/poster.jpg",
    movieName: "Mock Movie",
  };

  const nowPlaying = {
    teaser_1: false,
    teaser_2: false,
    teaser_3: false,
  };

  render(
    <TCard
      teaserData={mockTeaserData}
      nowPlaying={nowPlaying}
      setNowPlaying={jest.fn()}
      timer={'00 : 00'}
      startTimer={jest.fn()}
      stopTimer={jest.fn()}
      seconds={10}
      setSeconds={jest.fn()}
    />
  );

  expect(screen.getByText("Mock Movie")).toBeInTheDocument();
});
