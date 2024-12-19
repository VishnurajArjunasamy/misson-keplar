import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SideBarState } from "../modals/sidebar-modal";
import { getMemebers } from "../services/members";
import { ERROR_MSG } from "../constants/app.constants";

export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    return getMemebers();
  }
);

const inititalState: SideBarState = {
  showMembers: false,
  isDarkMode: false,
  members: null,
  loading: false,
  error: null,
};

const sideBarSlice = createSlice({
  name: "SideBar",
  initialState: inititalState,
  reducers: {
    toggleShowMembers: (state) => {
      state.showMembers = !state.showMembers;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || ERROR_MSG.MESSAGE);
      });
  },
});

export const { toggleDarkMode, toggleShowMembers } = sideBarSlice.actions;

export default sideBarSlice.reducer;
