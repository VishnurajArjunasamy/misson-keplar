import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogIF, BlogWithIdIF } from "../modals/blog-list-modal";
import { postNewBlog } from "../services/new-blog";
import { ValidationErrors } from "../modals/new-blog-modal";
import { toast } from "react-toastify";


export const addNewBlog = createAsyncThunk(
  "newBlog/addNewBlog",
  async (newBlog: BlogWithIdIF[]) => {
    return postNewBlog(newBlog);
  }
);

interface NewBlogState {
  loading: boolean;
  error: string | null | ValidationErrors;
  isAdded: boolean;
  showNewBlogModal: boolean;
}

const initialState: NewBlogState = {
  loading: false,
  error: null,
  isAdded: false,
  showNewBlogModal: false,
};

const newBlogSlice = createSlice({
  name: "newBlog",
  initialState,
  reducers: {
    setShowNewBlogModal: (state, action) => {
      state.showNewBlogModal = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("New blog added successfully");
      })
      .addCase(addNewBlog.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Error while adding new blog";
        toast.error(state.error);
      });
  },
});

export const { setShowNewBlogModal, setError: setNewBlogError } =
  newBlogSlice.actions;
export default newBlogSlice.reducer;
