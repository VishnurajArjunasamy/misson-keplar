import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MemberCard from "../member-card";

const mockStore = configureStore([]);

describe("Member Card Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      sideBar: {
        isDarkMode: false,
      },
    });
  });

  it("renders member card with image, name and city", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemberCard image="smaple-img" name="user1" city="chennai" />
      </Provider>
    );
    expect(screen.getByAltText("user1")).toBeInTheDocument();
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("chennai")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders member card with light mode styles", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemberCard image="smaple-img" name="user1" city="chennai" />
      </Provider>
    );
    const memberCard = screen.getByText("user1").parentElement;
    expect(memberCard).toHaveClass("light");
    expect(memberCard).not.toHaveClass("dark");

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders member card with dark mode styles", () => {
    store = mockStore({
      sideBar: {
        isDarkMode: true,
      },
    });
    const { asFragment } = render(
      <Provider store={store}>
        <MemberCard image="smaple-img" name="user1" city="chennai" />
      </Provider>
    );
    const memberCard = screen.getByText("user1").parentElement;
    expect(memberCard).not.toHaveClass("light");
    expect(memberCard).toHaveClass("dark");
    expect(asFragment()).toMatchSnapshot();
  });
});
