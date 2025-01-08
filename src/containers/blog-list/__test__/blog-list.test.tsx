// import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";
// import thunk, { ThunkMiddleware } from "redux-thunk";
// import BlogList from "../blog-list";

// const mockStore = configureStore();
// describe("BlogList Component", () => {
//   let store: any;

//   beforeEach(() => {
//     store = mockStore({
//       blogList: {
//         data: [
//           {
//             id: "1",
//             title: "React Blog",
//             details: "Details of React",
//             type: "Tech",
//             photo: "test",
//           },
//           {
//             id: "2",
//             title: "Fitness Blog",
//             details: "Details of Fitness",
//             type: "Health",
//             photo: "test",
//           },
//         ],
//         loading: false,
//         error: null,
//         filters: { Tech: true, Health: false },
//         selectedBlog: null,
//         searchQuery: "",
//         bufferBlogId: null,
//       },
//       newBlog: {
//         showNewBlogModal: false,
//       },
//       blogDetails: {
//         isReadOnly: true,
//         showPopUPModal: false,
//       },
//       sideBar: {
//         isDarkMode: false,
//       },
//     });
//     store.dispatch = jest.fn();
//   });

//   it("should render loading state", () => {
//     store = mockStore({
//       blogList: {
//         loading: true,
//         data: [],
//         error: null,
//         filters: {},
//         selectedBlog: null,
//       },
//       newBlog: { showNewBlogModal: false },
//       blogDetails: { isReadOnly: true, showPopUPModal: false },
//       sideBar: { isDarkMode: false },
//     });
//     render(
//       <Provider store={store}>
//         <BlogList />
//       </Provider>
//     );

//     expect(screen.getByText("Loading...")).toBeInTheDocument();
//   });

//   it("should render error state", () => {
//     store = mockStore({
//       blogList: {
//         loading: false,
//         data: [],
//         error: "Failed to fetch blogs",
//         filters: {},
//         selectedBlog: null,
//       },
//       newBlog: { showNewBlogModal: false },
//       blogDetails: { isReadOnly: true, showPopUPModal: false },
//       sideBar: { isDarkMode: false },
//     });
//     render(
//       <Provider store={store}>
//         <BlogList />
//       </Provider>
//     );

//     expect(screen.getByText("Failed to fetch blogs")).toBeInTheDocument();
//   });

//   it("should render filtered blogs", () => {
//     render(
//       <Provider store={store}>
//         <BlogList />
//       </Provider>
//     );

//     expect(screen.getByText("React Blog")).toBeInTheDocument();
//     expect(screen.queryByText("Fitness Blog")).not.toBeInTheDocument(); // Filtered out
//   });

//   it("should open New Blog Modal on button click", () => {
//     render(
//       <Provider store={store}>
//         <BlogList />
//       </Provider>
//     );

//     const newBlogButton = screen.getByText("NEW");
//     fireEvent.click(newBlogButton);

//     expect(store.dispatch).toHaveBeenCalledWith({
//       type: "newBlog/setShowNewBlogModal",
//       payload: true,
//     });
//   });

//   it("should open popup when selecting a blog if not readonly", () => {
//     store = mockStore({
//       ...store.getState(),
//       blogDetails: { isReadOnly: false, showPopUPModal: false },
//     });

//     render(
//       <Provider store={store}>
//         <BlogList />
//       </Provider>
//     );

//     const blogCard = screen.getByText("React Blog");
//     fireEvent.click(blogCard);

//     expect(store.dispatch).toHaveBeenCalledWith({
//       type: "blogDetails/setShowPopUPModal",
//       payload: true,
//     });
//   });

//   it("should select blog directly if readonly", () => {
//     render(
//       <Provider store={store}>
//         <BlogList />
//       </Provider>
//     );

//     const blogCard = screen.getByText("React Blog");
//     fireEvent.click(blogCard);

//     expect(store.dispatch).toHaveBeenCalledWith({
//       type: "blogList/setSelectedBlogs",
//       payload: "1",
//     });
//   });
// });


import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import BlogList from "../blog-list";
import { fetchBlogs } from "../../../store/blog-list-slice";

jest.mock("../../../store/blog-list-slice", () => ({
  ...jest.requireActual("../../../store/blog-list-slice"),
  fetchBlogs: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("BlogList Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      blogList: {
        data: [
          { id: "1", title: "Test Blog 1", details: "Details 1", type: "type1" },
          { id: "2", title: "Test Blog 2", details: "Details 2", type: "type2" },
        ],
        loading: false,
        error: null,
        filters: { type1: true, type2: false },
        selectedBlog: null,
        searchQuery: "",
        bufferBlogId: null,
      },
      newBlog: {
        showNewBlogModal: false,
      },
      blogDetails: {
        isReadOnly: false,
        showPopUPModal: false,
      },
      sideBar: {
        isDarkMode: false,
      },
    });
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BlogList />
      </Provider>
    );

    expect(screen.getByText("Test Blog 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Blog 2")).not.toBeInTheDocument(); // type2 is filtered out
  });

  it("dispatches fetchBlogs on initial render", () => {
    render(
      <Provider store={store}>
        <BlogList />
      </Provider>
    );

    expect(fetchBlogs).toHaveBeenCalled();
  });

  it("shows loading text when loading is true", () => {
    store = mockStore({
      ...store.getState(),
      blogList: {
        ...store.getState().blogList,
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <BlogList />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error when error exists", () => {
    store = mockStore({
      ...store.getState(),
      blogList: {
        ...store.getState().blogList,
        error: "Failed to fetch blogs",
      },
    });

    render(
      <Provider store={store}>
        <BlogList />
      </Provider>
    );

    expect(screen.getByText("Failed to fetch blogs")).toBeInTheDocument();
  });

  it("filters blogs based on search query", () => {
    store = mockStore({
      ...store.getState(),
      blogList: {
        ...store.getState().blogList,
        searchQuery: "Test Blog 1",
      },
    });

    render(
      <Provider store={store}>
        <BlogList />
      </Provider>
    );

    expect(screen.getByText("Test Blog 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Blog 2")).not.toBeInTheDocument();
  });

  it("handles new blog modal open on button click", () => {
    render(
      <Provider store={store}>
        <BlogList />
      </Provider>
    );

    const newBlogButton = screen.getByText("New Blog");
    fireEvent.click(newBlogButton);

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "newBlog/setShowNewBlogModal", payload: true });
  });

  it("handles blog selection and shows popup modal", () => {
    render(
      <Provider store={store}>
        <BlogList />
      </Provider>
    );

    const blogCard = screen.getByText("Test Blog 1");
    fireEvent.click(blogCard);

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "blogList/setBufferBlogId", payload: "1" });
    expect(actions).toContainEqual({ type: "blogDetails/setShowPopUPModal", payload: true });
  });

  it("renders dark mode styles when isDarkMode is true", () => {
    store = mockStore({
      ...store.getState(),
      sideBar: {
        isDarkMode: true,
      },
    });

    render(
      <Provider store={store}>
        <BlogList />
      </Provider>
    );

    const blogListContainer = screen.getByText("Test Blog 1").closest("div");
    expect(blogListContainer).toHaveClass("dark");
  });
});

