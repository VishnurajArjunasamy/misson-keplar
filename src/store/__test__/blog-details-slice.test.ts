import blogDetailsReducer, {
  setIsReadOnly,
  setUpdateBlogError,
  setShowPopUPModal,
  updateBlog,
} from "../blog-details-slice";


jest.mock("../../services/blog-add-update");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("blogDetailsSlice", () => {
  const initialState = {
    isReadOnly: true,
    error: null,
    loading: false,
    showPopUPModal: false,
  };

  describe("Reducer Tests", () => {
    it("should handle initial state", () => {
      expect(blogDetailsReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it("should set isReadOnly", () => {
      const state = blogDetailsReducer(initialState, setIsReadOnly(false));
      expect(state.isReadOnly).toBe(false);
    });

    it("should set error", () => {
      const error = "An error occurred";
      const state = blogDetailsReducer(initialState, setUpdateBlogError(error));
      expect(state.error).toBe(error);
    });

    it("should toggle showPopUPModal", () => {
      const state = blogDetailsReducer(initialState, setShowPopUPModal(true));
      expect(state.showPopUPModal).toBe(true);
    });
  });
});
