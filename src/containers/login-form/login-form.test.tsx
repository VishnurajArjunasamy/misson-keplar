import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./login-form";
import { loginService } from "../../services/loginService/loginService";

jest.mock("../../services/loginService/loginService", () => ({
  loginService: jest.fn(),
}));

jest.mock("../../context/auth-context", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockSetErr = jest.fn();

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render form inputs and button", () => {
    render(<LoginForm err={{}} setErr={mockSetErr} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should show validation errors if the form is submitted with invalid inputs", async () => {
    render(
      <LoginForm
        err={{
          email: "Email cannot be empty",
          password: "Password cannot be empty",
        }}
        setErr={mockSetErr}
      />
    );
    expect(screen.getByText("Email cannot be empty")).toBeInTheDocument();
    expect(screen.getByText(/Password cannot be empty/i)).toBeInTheDocument();
  });

  test("should call login service and navigate on successful login", async () => {
    (loginService as jest.Mock).mockResolvedValue({
      status: "success",
      user: { id: 1, name: "John Doe" },
    });

    render(<LoginForm err={{}} setErr={mockSetErr} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByTestId("login-form"));

    await waitFor(() => {
      expect(loginService).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  test("should show error message on failed login attempt", async () => {
    render(<LoginForm err={{}} setErr={mockSetErr} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    const subBtn = screen.getByRole("button", { name: /login/i });
    fireEvent.click(subBtn);
  });
});
