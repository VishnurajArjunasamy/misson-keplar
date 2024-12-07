import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { withAdvertisement } from "./withAdvertisement";

const MockComponent: React.FC<{
  timer?: string;
  startTimer?: (duration: number) => void;
  stopTimer?: () => void;
  seconds?: number | null;
}> = ({ timer, startTimer = () => {}, stopTimer = () => {}, seconds }) => (
  <div>
    <p data-testid="timer">{timer}</p>
    <p data-testid="seconds">{seconds}</p>
    <button data-testid="start-timer" onClick={() => startTimer(10)}>
      Start Timer
    </button>
    <button data-testid="stop-timer" onClick={stopTimer}>
      Stop Timer
    </button>
  </div>
);

const EnhancedComponent = withAdvertisement(MockComponent);

describe("withAdvertisement HOC", () => {
  jest.useFakeTimers();

  test("starts the timer and updates seconds", () => {
    render(<EnhancedComponent />);
    const startButton = screen.getByTestId("start-timer");

    act(() => {
      startButton.click(); 
    });

    expect(screen.getByTestId("seconds")).toHaveTextContent("10");

    act(() => {
      jest.advanceTimersByTime(1000); 
    });

    expect(screen.getByTestId("seconds")).toHaveTextContent("9");
    expect(screen.getByTestId("timer")).toHaveTextContent("00 : 09");
  });

  test("stops the timer", () => {
    render(<EnhancedComponent />);
    const startButton = screen.getByTestId("start-timer");
    const stopButton = screen.getByTestId("stop-timer");

    act(() => {
      startButton.click(); 
    });

    act(() => {
      jest.advanceTimersByTime(3000); 
    });

    expect(screen.getByTestId("seconds")).toHaveTextContent("7");

    act(() => {
      stopButton.click(); 
      jest.advanceTimersByTime(3000); 
    });

    expect(screen.getByTestId("seconds")).toHaveTextContent("7");
  });

  test("resets the timer on unmount", () => {
    const { unmount } = render(<EnhancedComponent />);
    const startButton = screen.getByTestId("start-timer");

    act(() => {
      startButton.click(); 
    });

    act(() => {
      jest.advanceTimersByTime(3000); 
    });

    expect(screen.getByTestId("seconds")).toHaveTextContent("7");

    act(() => {
      unmount();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByTestId("seconds")).toBeNull();
  });
});
