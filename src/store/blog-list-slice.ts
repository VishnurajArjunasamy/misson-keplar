import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BlogListState } from "../modals/blog-list-modal";
import { fetchBlogList } from "../services/blog-list";
import { getAvailableFilters } from "../utils/getAvailableFilters";
import { ERROR_MSG } from "../constants/app.constants";
import { addNewBlog } from "./new-blog-slice";
import { updateBlog } from "./blog-details-slice";

export const fetchBlogs = createAsyncThunk("blogList/fetchData", async () => {
  return fetchBlogList();
});

export const initialState: BlogListState = {
  data: null,
  loading: false,
  error: null,
  bufferBlogId: null,
  selectedBlog: null,
  searchQuery: null,
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
    setSelectedBlogs: (state, action) => {
      state.selectedBlog = action.payload;
    },
    setBufferBlogId: (state, action) => {
      state.bufferBlogId = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setBlogs: (state, action) => {
      state.data = action.payload;
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
        state.selectedBlog = action.payload[0].id;
        state.filters = getAvailableFilters(action.payload);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || ERROR_MSG.MESSAGE;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const {
  changeFilter,
  setSelectedBlogs,
  setSearchQuery,
  setBlogs,
  setBufferBlogId,
} = blogListSlice.actions;
export default blogListSlice.reducer;
