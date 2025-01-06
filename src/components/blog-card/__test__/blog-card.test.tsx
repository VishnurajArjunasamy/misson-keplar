import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import BlogCard from "../blog-card";

const mockStore = configureStore([]);

describe("BlogCard Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      sideBar: {
        isDarkMode: false,
      },
    });
  });

  it("renders BlogCard with light mode styles", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BlogCard
          title="Test Blog"
          details="This is a test blog."
          type="Tech"
          onClick={() => {}}
          active={false}
        />
      </Provider>
    );

    expect(screen.getByText("Test Blog")).toBeInTheDocument();
    expect(screen.getByText("This is a test blog.")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    const blogCard = screen.getByText("Test Blog").parentElement;
    expect(blogCard).toHaveClass("blogCard");
    expect(blogCard).toHaveClass("light");
    expect(blogCard).not.toHaveClass("dark");

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders BlogCard with dark mode styles", () => {
    store = mockStore({
      sideBar: {
        isDarkMode: true,
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <BlogCard
          title="Test Blog"
          details="This is a test blog."
          type="Tech"
          onClick={() => {}}
          active={false}
        />
      </Provider>
    );

    const blogCard = screen.getByText("Test Blog").parentElement;
    expect(blogCard).toHaveClass("dark");
    expect(blogCard).not.toHaveClass("light");

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies the active class when active prop is true", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BlogCard
          title="Test Blog"
          details="This is a test blog."
          type="Tech"
          onClick={() => {}}
          active={true}
        />
      </Provider>
    );

    const blogCard = screen.getByText("Test Blog").parentElement;
    expect(blogCard).toHaveClass("active");

    expect(asFragment()).toMatchSnapshot();
  });

  it("calls the onClick function when clicked", () => {
    const handleClick = jest.fn();

    const { asFragment } = render(
      <Provider store={store}>
        <BlogCard
          title="Test Blog"
          details="This is a test blog."
          type="Tech"
          onClick={handleClick}
          active={false}
        />
      </Provider>
    );

    const blogCard = screen.getByText("Test Blog").parentElement;
    if (blogCard) {
      fireEvent.click(blogCard);
    }

    expect(handleClick).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
