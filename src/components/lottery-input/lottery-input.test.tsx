import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LotteryInput from "./lottery-input"; 
import { LOTTERY } from "../../constants/app-constants";

jest.mock("./lottery-input.module.scss", () => ({
  lotteryForm: "mock-lottery-form",
  inpErrorBox: "mock-inp-error-box",
  error: "mock-error",
  lotteryMsg: "mock-lottery-msg",
}));

describe("LotteryInput Component", () => {
  test("renders initial state correctly", () => {
    render(<LotteryInput />);
    expect(screen.getByText(LOTTERY.MESSAGE)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Mobile Number")).toBeInTheDocument();
    expect(screen.getByText(LOTTERY.BTN_TXT)).toBeInTheDocument();
  });

  test("shows an error when invalid mobile number is submitted", () => {
    render(<LotteryInput />);
    const input = screen.getByPlaceholderText("Enter Mobile Number");
    const button = screen.getByText(LOTTERY.BTN_TXT);
    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.click(button);
    expect(screen.getByText("Enter a valid Mobile Number")).toBeInTheDocument();
  });

  test("shows winning message for valid even mobile number", () => {
    render(<LotteryInput />);
    const input = screen.getByPlaceholderText("Enter Mobile Number");
    const button = screen.getByText(LOTTERY.BTN_TXT);
    fireEvent.change(input, { target: { value: "8468027860" } });
    fireEvent.click(button);
    expect(screen.getByText(LOTTERY.WIN_MSG)).toBeInTheDocument();
  });

  test("throws error for valid odd mobile number", () => {
    render(<LotteryInput />);
    const input = screen.getByPlaceholderText("Enter Mobile Number");
    const button = screen.getByText(LOTTERY.BTN_TXT);
    fireEvent.change(input, { target: { value: "7234567897" } });
    expect(() => fireEvent.click(button)).toThrowError(LOTTERY.LOST_MDG);
  });

  test("removes error message when a valid mobile number is entered after an error", () => {
    render(<LotteryInput />);
    const input = screen.getByPlaceholderText("Enter Mobile Number");
    const button = screen.getByText(LOTTERY.BTN_TXT);
    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.click(button);
    expect(screen.getByText("Enter a valid Mobile Number")).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "7468078942" } });
    fireEvent.click(button);
    expect(screen.queryByText("Enter a valid Mobile Number")).not.toBeInTheDocument();
    expect(screen.getByText(LOTTERY.WIN_MSG)).toBeInTheDocument();
  });
});
