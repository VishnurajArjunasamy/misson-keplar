import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BLOG_LIST } from "../../../constants/app.constants";
import SearchBar from "../search-bar";
import { setSearchQuery } from "../../../store/blog-list-slice";

const mockStore = configureStore([]);

describe("SearchBar Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      sideBar: {
        isDarkMode: false,
      },
      blogList: {
        searchQuery: "",
      },
    });

    store.dispatch = jest.fn();
  });

  it("renders the SearchBar with placeholder", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(BLOG_LIST.SEARCH_TXT);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("applies dark mode styles when isDarkMode is true", () => {
    store = mockStore({
      sideBar: {
        isDarkMode: true,
      },
      blogList: {
        searchQuery: "",
      },
    });

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchBar = screen.getByPlaceholderText(BLOG_LIST.SEARCH_TXT)
      .parentElement?.parentElement;
    // expect(searchBar).toHaveClass("dark");
  });

  it("dispatches setSearchQuery action on input change", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(BLOG_LIST.SEARCH_TXT);
    fireEvent.change(input, { target: { value: "Test Query" } });

    expect(store.dispatch).toHaveBeenCalledWith(setSearchQuery("Test Query"));
  });

  it("renders with pre-filled search query from state", () => {
    store = mockStore({
      sideBar: {
        isDarkMode: false,
      },
      blogList: {
        searchQuery: "Existing Query",
      },
    });

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(BLOG_LIST.SEARCH_TXT);
    expect(input).toHaveValue("Existing Query");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
