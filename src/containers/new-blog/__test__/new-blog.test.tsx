import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import NewBlog from "../new-blog";
import "@testing-library/jest-dom";
import {
  addNewBlog,
  setNewBlogError,
  setShowNewBlogModal,
} from "../../../store/new-blog-slice";

jest.mock("../../../store/new-blog-slice", () => ({
  addNewBlog: jest.fn(),
  setNewBlogError: jest.fn(),
  setShowNewBlogModal: jest.fn(),
}));

const mockStore = configureStore();

describe("NewBlog Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      blogList: { data: [] },
      sideBar: { isDarkMode: false },
      newBlog: { error: null },
    });
    store.dispatch = jest.fn();
  });
  beforeEach(() => {
    global.crypto.randomUUID = jest.fn(
      () => "123e4567-e89b-12d3-a456-426614174000"
    );
  });

  it("renders the NewBlog component correctly", () => {
    render(
      <Provider store={store}>
        <NewBlog />
      </Provider>
    );

    expect(screen.getByText("Add New Blog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name your blog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Blog Image URL")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write Content Here ..")
    ).toBeInTheDocument();
    expect(screen.getByText("ADD")).toBeInTheDocument();
  });


  it("shows validation errors if form fields are empty", async () => {
    render(
      <Provider store={store}>
        <NewBlog />
      </Provider>
    );
    fireEvent.click(screen.getByText("ADD"));

    await waitFor(() => {
      expect(setNewBlogError).toHaveBeenCalled();
      // expect(screen.getByText("Title is required")).toBeInTheDocument();
      //   expect(screen.getByText("Details is required")).toBeInTheDocument();
    });
  });

  it("dispatches addNewBlog action when form is valid", async () => {
    render(
      <Provider store={store}>
        <NewBlog />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Name your blog"), {
      target: { value: "Test Blog" },
    });
    fireEvent.change(screen.getByPlaceholderText("Blog Image URL"), {
      target: { value: "https://image.jpg" },
    });
    fireEvent.change(screen.getByPlaceholderText("Write Content Here .."), {
      target: { value: "This is a test blog content." },
    });

    fireEvent.click(screen.getByText("ADD"));

    await waitFor(() => {
      expect(setNewBlogError).toHaveBeenCalledWith({});
      expect(addNewBlog).toHaveBeenCalledWith([
        {
          title: "Test Blog",
          details: "This is a test blog content.",
          photo: "https://image.jpg",
          type: "Local",
          id: expect.any(String),
        },
      ]);
      expect(setShowNewBlogModal).toHaveBeenCalledWith(false);
    });
  });

  it("clears errors when component unmounts", () => {
    const { unmount } = render(
      <Provider store={store}>
        <NewBlog />
      </Provider>
    );

    unmount();

    expect(store.dispatch).toHaveBeenCalledWith(setNewBlogError(null));
  });
});
