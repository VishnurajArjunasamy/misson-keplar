import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MemebersSection from "../memebers-section";
import { fetchMembers } from "../../../store/side-bar-slice";
import "@testing-library/jest-dom";


// Create a mock store
const mockStore = configureMockStore();

jest.mock("../../../store/side-bar-slice", () => ({
  fetchMembers: jest.fn(),
}));

describe("MemebersSection Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      sideBar: {
        members: [],
        loading: false,
        error: null,
        isDarkMode: false,
      },
    });
    store.dispatch = jest.fn();
  });

  it("renders loading state", () => {
    store = mockStore({
      sideBar: {
        members: [],
        loading: true,
        error: null,
        isDarkMode: false,
      },
    });

    render(
      <Provider store={store}>
        <MemebersSection />
      </Provider>
    );

    expect(screen.getByText("Loading..")).toBeInTheDocument();
  });

  it("renders error state", () => {
    store = mockStore({
      sideBar: {
        members: [],
        loading: false,
        error: "Failed to fetch members",
        isDarkMode: false,
      },
    });

    render(
      <Provider store={store}>
        <MemebersSection />
      </Provider>
    );

    expect(screen.getByText("Failed to fetch members")).toBeInTheDocument();
  });

  it("renders members correctly", () => {
    const mockMembers = [
      {
        id: 1,
        name: "John Doe",
        photo: "john.jpg",
        company: { location: "New York" },
      },
      {
        id: 2,
        name: "Jane Smith",
        photo: "jane.jpg",
        company: { location: "San Francisco" },
      },
    ];

    store = mockStore({
      sideBar: {
        members: mockMembers,
        loading: false,
        error: null,
        isDarkMode: false,
      },
    });

    render(
      <Provider store={store}>
        <MemebersSection />
      </Provider>
    );

    // Check if member cards are rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("San Francisco")).toBeInTheDocument();
  });

  it("applies dark mode styling", () => {
    store = mockStore({
      sideBar: {
        members: [],
        loading: false,
        error: null,
        isDarkMode: true,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemebersSection />
      </Provider>
    );

    expect(container.firstChild).toHaveClass("dark");
  });

  it("dispatches fetchMembers on mount", () => {
    render(
      <Provider store={store}>
        <MemebersSection />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchMembers());
  });
});
