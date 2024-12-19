import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BlogListState } from "../modals/blog-list-modal";
import { fetchBlogList } from "../services/blog-list";
import { getAvailableFilters } from "../utils/getAvailableFilters";

export const fetchBlogs = createAsyncThunk("blogList/fetchData", async () => {
  return fetchBlogList();
});

const initialState: BlogListState = {
  data: null,
  loading: false,
  error: null,
  filters: {},
};

const blogListSlice = createSlice({
  name: "blogList",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      const id: string = action.payload;
      state.filters[id] = !state.filters[id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filters = getAvailableFilters(action.payload);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {changeFilter} = blogListSlice.actions;
export default blogListSlice.reducer;
