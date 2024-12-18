import { createSlice } from "@reduxjs/toolkit";
import { FiltersApplied, SideBarState } from "../modals/sideBarModal";

const inititalState: SideBarState = {
  filtersApplied: {},
  showMembers: false,
  isDarkMode: false,
};

const sideBarSlice = createSlice({
  name: "SideBar",
  initialState: inititalState,
  reducers: {
    changeFilter: (state, action) => {
      const id: string = action.payload;
      state.filtersApplied[id] = !state.filtersApplied[id];
    },
    setAvailableFilters: (state, action) => {
      const filters: string[] = action.payload;
      const obj: FiltersApplied = {};
      filters.forEach((filter) => (obj[filter] = true));
      state.filtersApplied = obj;
    },
    toggleShowMembers: () => {},
    toggleDarkMode: () => {},
  },
});

export const {
  changeFilter,
  setAvailableFilters,
  toggleDarkMode,
  toggleShowMembers,
} = sideBarSlice.actions;

export default sideBarSlice.reducer;
