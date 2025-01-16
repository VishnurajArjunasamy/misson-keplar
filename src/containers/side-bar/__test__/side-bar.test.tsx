import { render, screen, fireEvent } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import SideBar from "../side-bar";
import sideBarReducer, {
  toggleDarkMode,
  toggleShowMembers,
} from "../../../store/side-bar-slice";

// Mocking components
jest.mock("../../filter-section/filter-section", () => () => (
  <div>FilterSection</div>
));
// jest.mock("../../components/modal/modal", () => ({ children, closeModal }) => (
//   <div onClick={closeModal}>
//     <div>{children}</div>
//   </div>
// ));
jest.mock("../../members-section/members-section", () => () => (
  <div>MembersSection</div>
));

// jest.mock("../../../store/side-bar-slice", () => ({
//     toggleDarkMode: jest.fn(),
//   }));

let store = configureStore({
  reducer: { sideBar: sideBarReducer },
  preloadedState: {
    sideBar: {
      showMembers: false,
      isDarkMode: false,
      members: null,
      loading: false,
      error: null,
    },
  },
});

interface UpdatedValues {
  showMembers?: boolean;
  isDarkMode?: boolean;
  members?: any;
  loading?: boolean;
  error?: any;
}

function updateStore(updatedValues: UpdatedValues) {
  return configureStore({
    reducer: { sideBar: sideBarReducer },
    preloadedState: {
      sideBar: {
        ...store.getState().sideBar,
        ...updatedValues,
      },
    },
  });
}

describe("SideBar Component", () => {
  beforeEach(() => {
  });

  it("renders the component correctly", () => {
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );

    expect(screen.getByText("Little")).toBeInTheDocument();
    expect(screen.getByText("FilterSection")).toBeInTheDocument();
  });

  it("dispatches toggleShowMembers when 'View Members' is clicked", () => {
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );

    const mockDispatch = jest.fn(); 
    fireEvent.click(screen.getByText("View Members"));
  });

  it("dispatches toggleDarkMode when 'Switch Dark Mode' is clicked", () => {
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    const mockDispatch=jest.fn()
    const darkModeButton = screen.getByText("Switch to Dark Mode");
    fireEvent.click(darkModeButton);
  });

  it("displays the modal when showMembers is true", () => {
    store = updateStore({ showMembers: true });

    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );

    expect(screen.getByText("MembersSection")).toBeInTheDocument();
  });

  it("toggles dark mode class based on isDarkMode", () => {
    store = updateStore({ isDarkMode: true });

    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );

    expect(screen.getByText("FilterSection").parentElement).toHaveClass("dark");

    //     store = updateStore({ isDarkMode: false });

    //     render(
    //       <Provider store={store}>
    //         <SideBar />
    //       </Provider>
    //     );

    //     expect(
    //       screen.getByText("FilterSection").parentElement?.parentElement
    //     ).toHaveClass("light");
  });
});
function mockStore(arg0: {
  sideBar: { isDarkMode: boolean; showMembers: boolean };
}): import("@reduxjs/toolkit").EnhancedStore<
  { sideBar: import("../../../modals/sidebar-modal").SideBarState },
  import("redux").UnknownAction,
  import("@reduxjs/toolkit").Tuple<
    [
      import("redux").StoreEnhancer<{
        dispatch: import("redux-thunk").ThunkDispatch<
          { sideBar: import("../../../modals/sidebar-modal").SideBarState },
          undefined,
          import("redux").UnknownAction
        >;
      }>,
      import("redux").StoreEnhancer
    ]
  >
> {
  throw new Error("Function not implemented.");
}
