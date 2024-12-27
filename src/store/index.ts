import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./side-bar-slice";
import blogListReducer from "./blog-list-slice";
import newBlogReducer from "./new-blog-slice";

const store = configureStore({
  reducer: {
    sideBar: sideBarReducer,
    blogList: blogListReducer,
    newBlog: newBlogReducer,
  },
});
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
