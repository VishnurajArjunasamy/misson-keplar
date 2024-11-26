import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrailerSection from "./trailer-section";
import { MemoryRouter } from "react-router-dom";

const TRAILERS = {
  TRAILER_TITLE: "Sintel",
  TRAILER_DESC:
    "Sintel tells the story of a friendship between a girl named Sintel, a baby dragon and the desperate lengths she will go to when that friendship is taken from her.Sintel is created by Blender in 2010 as a pet project to demonstrate Blender capabilities.",
  WATCH_NOW: "WATCH NOW",
};

it("Check Navbar render", () => {
  render(
    <MemoryRouter>
      <TrailerSection />
    </MemoryRouter>
  );

  expect(screen.getByText(TRAILERS.TRAILER_TITLE)).toBeInTheDocument();
  expect(screen.getByText(TRAILERS.TRAILER_DESC)).toBeInTheDocument();
  expect(screen.getByText(TRAILERS.WATCH_NOW)).toBeInTheDocument();
});
