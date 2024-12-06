import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LotteryInput from "../lottery-input/lottery-input";
import LotterySection from "./lottery-section";

jest.mock("./LotterySection.module.scss", () => ({
  lotterySection: "mock-lottery-section",
  lotteryMsg: "mock-lottery-msg",
}));


jest.mock("../lottery-input/lottery-input", () => {
  return jest.fn(() => {
    throw new Error("Test error message");
  });
});

describe("LotterySection Component", () => {
  test("renders fallback UI when LotteryInput throws an error", () => {
    render(<LotterySection />);
    const errorMessage = screen.getByText("Test error message");
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders without error if LotteryInput works correctly", () => {
    jest
      .mocked(LotteryInput)
      .mockImplementation(() => <div>Lottery Input Component</div>);
    render(<LotterySection />);
    const lotteryInput = screen.getByText("Lottery Input Component");
    expect(lotteryInput).toBeInTheDocument();
  });
});
