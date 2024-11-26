import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./navbar";
import { MemoryRouter } from "react-router-dom";

it("Check Navbar render", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByText("HOME")).toBeInTheDocument();
  expect(screen.getByText("ALL MOVIES")).toBeInTheDocument();
  expect(screen.getByText("LOGIN")).toBeInTheDocument();
});
