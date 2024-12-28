import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogIF, BlogWithIdIF } from "../modals/blog-list-modal";
import { postNewBlog } from "../services/new-blog";
import { NewBlogIF } from "../modals/new-blog-modal";

export const addNewBlog = createAsyncThunk(
  "newBlog/addNewBlog",
  async (newBlog: BlogWithIdIF[]) => {
    return postNewBlog(newBlog);
  }
);

interface NewBlogState {
  loading: boolean;
  error: string | null;
  data: BlogIF[] | [];
  showNewBlogModal: boolean;
}

const initialState: NewBlogState = {
  loading: false,
  error: null,
  data: [],
  showNewBlogModal: false,
};

const newBlogSlice = createSlice({
  name: "newBlog",
  initialState,
  reducers: {
    setShowNewBlogModal: (state, action) => {
      state.showNewBlogModal = action.payload;
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
        // state.data.push(action.payload);
      })
      .addCase(addNewBlog.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Error while adding new blog";
      });
  },
});

export const {setShowNewBlogModal} = newBlogSlice.actions;
export default newBlogSlice.reducer;
