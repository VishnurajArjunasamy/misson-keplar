import blogListReducer, {
  initialState,
  changeFilter,
  setSelectedBlogs,
  setSearchQuery,
  setBlogs,
  setBufferBlogId,
  fetchBlogs,
} from "../blog-list-slice";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("../../services/blog-list");
jest.mock("../../utils/getAvailableFilters");

describe("blogListSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        blogList: blogListReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Reducer Tests", () => {
    it("should return the initial state", () => {
      expect(blogListReducer(undefined, { type: "" })).toEqual(
        initialState
      );
    });

    it("should handle changeFilter", () => {
      const initial = {
        ...initialState,
        filters: { national: true, international: false },
      };
      const state = blogListReducer(initial, changeFilter("national"));
      expect(state.filters).toEqual({ national: false, international: false });
    });

    it("should handle setSelectedBlogs", () => {
      const state = blogListReducer(initialState, setSelectedBlogs("blog1"));
      expect(state.selectedBlog).toBe("blog1");
    });

    it("should handle setSearchQuery", () => {
      const state = blogListReducer(initialState, setSearchQuery("query"));
      expect(state.searchQuery).toBe("query");
    });

    it("should handle setBlogs", () => {
      const mockBlogs = [{ id: "1", title: "Blog 1" }];
      const state = blogListReducer(initialState, setBlogs(mockBlogs));
      expect(state.data).toEqual(mockBlogs);
    });

    it("should handle setBufferBlogId", () => {
      const state = blogListReducer(initialState, setBufferBlogId("buffer1"));
      expect(state.bufferBlogId).toBe("buffer1");
    });
  });
});
