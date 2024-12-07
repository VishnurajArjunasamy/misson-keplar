import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./ home";

jest.mock("../../components/lottery-section/lottery-section", () => () => (
  <div data-testid="lottery-section">Lottery Section</div>
));

jest.mock("../../containers/trailer-section/trailer-section", () => () => (
  <div data-testid="trailer-section">Trailer Section</div>
));

jest.mock("../../containers/short-teasers/short-teasers", () => () => (
  <div data-testid="short-teasers">Short Teasers</div>
));

jest.mock("../../containers/other-languages/other-languages", () => () => (
  <div data-testid="other-languages">Other Languages</div>
));

describe("Home Component", () => {
  test("renders Home component correctly", () => {
    render(<Home />);
    const bannerImage = screen.getByRole("img");
    expect(bannerImage).toBeInTheDocument();

    expect(screen.getByTestId("lottery-section")).toBeInTheDocument();
    expect(screen.getByTestId("trailer-section")).toBeInTheDocument();
    expect(screen.getByTestId("short-teasers")).toBeInTheDocument();
    expect(screen.getByTestId("other-languages")).toBeInTheDocument();
  });

});
