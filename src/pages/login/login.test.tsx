import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./login";

jest.mock("../../containers/login-form/login-form", () => () => (
  <div data-testid="login-form">Mock LoginForm Component. Errors:</div>
));

describe("Login Component", () => {
  test("renders Login component correctly", () => {
    render(<Login />);

    const message = screen.getByText("Login");
    expect(message).toBeInTheDocument();

    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
    expect(loginForm).toHaveTextContent("Mock LoginForm Component. Errors:");
  });
});
