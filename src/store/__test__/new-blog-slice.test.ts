import newBlogReducer, {
  addNewBlog,
  setShowNewBlogModal,
  setNewBlogError,
} from "../new-blog-slice";
import { configureStore } from "@reduxjs/toolkit";


jest.mock("../../services/blog-add-update");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("newBlogSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        newBlog: newBlogReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Reducer Tests", () => {
    it("should return the initial state", () => {
      const initialState = {
        loading: false,
        error: null,
        isAdded: false,
        showNewBlogModal: false,
      };
      expect(newBlogReducer(undefined, { type: '' })).toEqual(
        initialState
      );
    });

    it("should handle setShowNewBlogModal", () => {
      const state = newBlogReducer(undefined, setShowNewBlogModal(true));
      expect(state.showNewBlogModal).toBe(true);
    });

    it("should handle setNewBlogError", () => {
      const error = "An error occurred";
      const state = newBlogReducer(undefined, setNewBlogError(error));
      expect(state.error).toBe(error);
    });
  });
});
