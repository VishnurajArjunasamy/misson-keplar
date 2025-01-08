import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import BlogDetails from "../blog-details";
import {
  setIsReadOnly,
  setUpdateBlogError,
  updateBlog,
} from "../../../store/blog-details-slice";

const mockStore = configureStore([]);

describe("BlogDetails Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      sideBar: {
        isDarkMode: false,
      },
      blogList: {
        selectedBlog: 1,
        data: [
          {
            id: 1,
            title: "Test Blog",
            details: "Test Blog Details",
            photo: "",
            type: "general",
          },
        ],
      },
      blogDetails: {
        isReadOnly: true,
        error: {},
      },
    });

    store.dispatch = jest.fn();
  });

  it("renders BlogDetails component with default values", () => {
    render(
      <Provider store={store}>
        <BlogDetails />
      </Provider>
    );

    expect(screen.getByDisplayValue("Test Blog")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Blog Details")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "EDIT CONTENT" })
    ).toBeInTheDocument();
  });

  it("applies dark mode styles when isDarkMode is true", () => {
    store = mockStore({
      ...(store.getState() as object),
      sideBar: {
        isDarkMode: true,
      },
    });

    render(
      <Provider store={store}>
        <BlogDetails />
      </Provider>
    );

    const section = screen.getByAltText("image").parentElement?.parentElement;
    expect(section).toHaveClass("dark");
  });

  it("renders error messages for invalid inputs", () => {
    store = mockStore({
      ...(store.getState() as object),
      blogDetails: {
        error: {
          title: "Title is required",
          details: "Details are required",
        },
      },
    });

    render(
      <Provider store={store}>
        <BlogDetails />
      </Provider>
    );

    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Details are required")).toBeInTheDocument();
  });

  it("allows editing and saves the updated blog details", async () => {
    render(
      <Provider store={store}>
        <BlogDetails />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "EDIT CONTENT" }));

    waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(setIsReadOnly(false));
      const titleInput = screen.getByDisplayValue("Test Blog");
      const detailsInput = screen.getByDisplayValue("Test Blog Details");

      fireEvent.change(titleInput, { target: { value: "Updated Blog Title" } });
      fireEvent.change(detailsInput, {
        target: { value: "Updated Blog Details" },
      });

      fireEvent.click(screen.getByTestId("SAVE"));

      expect(store.dispatch).toHaveBeenCalledWith(
        updateBlog([
          {
            id: "1",
            title: "Updated Blog Title",
            details: "Updated Blog Details",
            photo: "",
            type: "general",
          },
        ])
      );
    });
  });

  it("cancels edits and resets input values", async () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <BlogDetails />
      </Provider>
    );
    const editButton = screen.getByRole("button", { name: "EDIT CONTENT" });
    expect(editButton).toBeInTheDocument();
    const titleInput = screen.getByDisplayValue("Test Blog");
    expect(titleInput).toHaveAttribute("readonly");

    fireEvent.click(editButton);
    waitFor(() => {
      fireEvent.change(titleInput, { target: { value: "Modified Title" } });
      expect(titleInput).toHaveValue("Modified Title");

      const cancelButton = screen.getByTestId("CANCEL");
      expect(cancelButton).toBeInTheDocument();
      fireEvent.click(cancelButton);
      expect(titleInput).toHaveValue("Test Blog");
      expect(mockDispatch).toHaveBeenCalledWith(setIsReadOnly(true));
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BlogDetails />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
