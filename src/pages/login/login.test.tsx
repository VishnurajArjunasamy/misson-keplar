import { render, screen } from "@testing-library/react";
import Login from "./login";

jest.mock("../../containers/login-form/login-form", () => () => (
  <div data-testid="login-form">Mock LoginForm Component. Errors:</div>
));

describe("Login Component", () => {
  it("renders Login component correctly", () => {
    render(<Login />);

    const message = screen.getByText(""); 
    expect(message).toBeInTheDocument();

    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
  });

  it("passes error state to LoginForm", () => {
    render(<Login />);

    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toHaveTextContent(
      JSON.stringify({
        email: undefined,
        password: undefined,
        validCred: undefined,
      })
    );
  });
});
