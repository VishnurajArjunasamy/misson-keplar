export interface FiltersApplied {
  [key: string]: boolean;
}
export interface BlogIF {
  title: string;
  details: string;
  photo: string;
  type: string;
}

export interface BlogWithIdIF extends BlogIF {
  id: string;
}

export interface BlogListState {
  data: BlogWithIdIF[] | null;
  selectedBlog: string | null;
  loading: boolean;
  error: string | null;
  filters: FiltersApplied;
  searchQuery: string | null;
}
