import { createSlice } from "@reduxjs/toolkit";
import { SideBarState } from "../modals/sideBarModal";

const inititalState: SideBarState = {
  showMembers: false,
  isDarkMode: false,
};

const sideBarSlice = createSlice({
  name: "SideBar",
  initialState: inititalState,
  reducers: {
    toggleShowMembers: () => {},
    toggleDarkMode: () => {},
  },
});

export const { toggleDarkMode, toggleShowMembers } = sideBarSlice.actions;

export default sideBarSlice.reducer;
