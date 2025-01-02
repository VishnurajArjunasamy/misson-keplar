import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogIF, BlogWithIdIF } from "../modals/blog-list-modal";
import { toast } from "react-toastify";
import { set } from "firebase/database";
import { updateBlogs } from "../services/blog-add-update";
import { ValidationErrors } from "../modals/new-blog-modal";

export const updateBlog = createAsyncThunk(
  "updateBlog",
  async (blog: BlogWithIdIF[]) => {
    return updateBlogs(blog);
  }
);

interface BlogDetailsState {
  isReadOnly: boolean;
  error: string | null | ValidationErrors;
  loading: boolean;
}

const initialState: BlogDetailsState = {
  error: null,
  loading: false,
  isReadOnly: true,
};

const blogDetailsSlice = createSlice({
  name: "blogDetails",
  initialState,
  reducers: {
    setIsReadOnly(state, action) {
      state.isReadOnly = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Blog updated successfully");
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error while updating blog";
        toast.error(state.error);
      });
  },
});

export const { setIsReadOnly, setError: setUpdateBlogError } =
  blogDetailsSlice.actions;
export default blogDetailsSlice.reducer;
