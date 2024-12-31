import { createSlice } from "@reduxjs/toolkit";
import { BlogIF } from "../modals/blog-list-modal";
import { set } from "firebase/database";

const initialState: { isReadOnly: boolean  } = {
  isReadOnly: true,
};

const blogDetailsSlice = createSlice({
  name: "blogDetails",
  initialState,
  reducers: {
    setIsReadOnly(state, action) {
      state.isReadOnly = action.payload;
    },
  },
});

export const { setIsReadOnly } = blogDetailsSlice.actions;
export default blogDetailsSlice.reducer;
