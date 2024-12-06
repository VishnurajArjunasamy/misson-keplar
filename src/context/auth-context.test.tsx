import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { AuthProvider, useAuth } from "./auth-context";
import React from "react";

describe("AuthProvider and useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const TestComponent = () => {
    const { user, saveUser, logout } = useAuth();

    return (
      <div>
        <p data-testid="user">{user}</p>
        <button onClick={() => saveUser("TestUser")} data-testid="save-user">
          Save User
        </button>
        <button onClick={logout} data-testid="logout">
          Logout
        </button>
      </div>
    );
  };

  const renderWithAuthProvider = (ui: React.ReactElement) => {
    return render(<AuthProvider>{ui}</AuthProvider>);
  };

  it("initializes with user from localStorage", () => {
    localStorage.setItem("user", "ExistingUser");

    renderWithAuthProvider(<TestComponent />);
    expect(screen.getByTestId("user").textContent).toBe('ExistingUser');
  });

  it("saves user and updates localStorage", () => {
    renderWithAuthProvider(<TestComponent />);
    const saveUserButton = screen.getByTestId("save-user");

    act(() => {
      saveUserButton.click();
    });

    expect(screen.getByTestId("user").textContent).toBe("TestUser");
    expect(localStorage.getItem("user")).toBe(JSON.stringify("TestUser"));
  });

  it("logs out user and removes from localStorage", () => {
    renderWithAuthProvider(<TestComponent />);
    const saveUserButton = screen.getByTestId("save-user");
    const logoutButton = screen.getByTestId("logout");

    // Save user first
    act(() => {
      saveUserButton.click();
    });

    // Then logout
    act(() => {
      logoutButton.click();
    });

    expect(screen.getByTestId("user").textContent).toBe("");
    expect(localStorage.getItem("user")).toBeNull();
  });

  it("provides context to children components", () => {
    renderWithAuthProvider(<TestComponent />);
    expect(screen.getByTestId("user")).toBeInTheDocument();
  });
});
