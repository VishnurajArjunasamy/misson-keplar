import { createSlice } from "@reduxjs/toolkit";
import { BlogIF } from "../modals/blog-list-modal";

const initialState: BlogIF = {
  title: "",
  details: "",
  photo: "",
  type: "",
};

const newBlogSlice = createSlice({
  name: "newBlog",
  initialState,
  reducers: {
    setNewBlog: (state, action) => {
      const { title, description, imageUrl } = action.payload;
      state.title = title;
      state.details = description;
      state.photo = imageUrl;
    },
  },
});

export const { setNewBlog } = newBlogSlice.actions;
export default newBlogSlice.reducer;
