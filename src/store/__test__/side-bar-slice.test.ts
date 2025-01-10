import sideBarReducer, {
  toggleDarkMode,
  toggleShowMembers,
  setMembers,
  setLoading,
  setError,
} from "../side-bar-slice";

describe("sideBarSlice Reducer and Actions", () => {
  const initialState = {
    showMembers: false,
    isDarkMode: false,
    members: null,
    loading: false,
    error: null,
  };

  it("should handle the initial state", () => {
    expect(sideBarReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should toggle showMembers", () => {
    const state = sideBarReducer(initialState, toggleShowMembers());
    expect(state.showMembers).toBe(true);
  });

  it("should toggle isDarkMode", () => {
    const state = sideBarReducer(initialState, toggleDarkMode());
    expect(state.isDarkMode).toBe(true);
  });

  it("should set members", () => {
    const mockMembers = [{ id: 1, name: "John Doe" }];
    const state = sideBarReducer(initialState, setMembers(mockMembers));
    expect(state.members).toEqual(mockMembers);
  });

  it("should set loading", () => {
    const state = sideBarReducer(initialState, setLoading(true));
    expect(state.loading).toBe(true);
  });

  it("should set error", () => {
    const mockError = "An error occurred";
    const state = sideBarReducer(initialState, setError(mockError));
    expect(state.error).toEqual(mockError);
  });
});
