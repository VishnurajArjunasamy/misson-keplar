export interface FiltersApplied {
  [key: string]: boolean;
}

export interface SideBarState {
  filtersApplied: FiltersApplied;
  showMembers: boolean;
  isDarkMode: boolean;
}
