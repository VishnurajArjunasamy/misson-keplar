import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import PrivateRoute from "./privateRoute";
import { SESSION } from "../constants/app-constants";

jest.mock("../context/auth-context", () => ({
  useAuth: jest.fn(),
}));

describe("PrivateRoute Component", () => {
  it("renders children when the user is authenticated", () => {

    (useAuth as jest.Mock).mockReturnValue({ user: "testUser" });

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div data-testid="protected-content">Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  it("redirects to login page when the user is not authenticated", () => {

    (useAuth as jest.Mock).mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <PrivateRoute>
          <div data-testid="protected-content">Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });
});
