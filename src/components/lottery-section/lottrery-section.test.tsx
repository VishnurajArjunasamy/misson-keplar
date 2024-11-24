import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ErrorBoundary } from "react-error-boundary";

it("Check Error boundary catches error", () => {
  const fallbackRender = () => (
    <div data-testid="error-fallback">Better Luck Next Time</div>
  );

  const BrokenLotteryInput = () => {
    throw new Error("Test error");
  };

  render(
    <ErrorBoundary fallbackRender={fallbackRender}>
      <BrokenLotteryInput />
    </ErrorBoundary>
  );

  expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
  expect(screen.getByText(/Better Luck Next Time/i)).toBeInTheDocument();
});
