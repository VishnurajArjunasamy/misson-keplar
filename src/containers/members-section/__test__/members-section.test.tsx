import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import MembersSection from "../members-section";
import { fetchMembers } from "../../../store/side-bar-slice";
import "@testing-library/jest-dom";

// Create a mock store
const mockStore = configureMockStore();

jest.mock("../../../store/side-bar-slice", () => ({
  fetchMembers: jest.fn(),
}));

describe("MemebersSection Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      sideBar: {
        members: [],
        loading: false,
        error: null,
        isDarkMode: false,
      },
    });
    store.dispatch = jest.fn();
  });

  it("dispatches fetchMembers on mount", () => {
    render(
      <Provider store={store}>
        <MembersSection />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchMembers());
  });
});
