import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./login-form";
import { MemoryRouter } from "react-router-dom";

const mockHandleSubmit = jest.fn();
const mockErrors = {
  email: "",
  password: "",
  validCred: "",
};

it("renders the form correctly", () => {
  render(
    <MemoryRouter>
      <LoginForm setErr={mockHandleSubmit} err={mockErrors} />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toHaveAttribute("type", "email");

  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toHaveAttribute(
    "type",
    "password"
  );

  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});
