import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PopUp from "../popup";

const mockStore = configureStore([]);

describe("Popup component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      sideBar: {
        isDarkMode: false,
      },
    });
  });

  it("renders modal with notification text and button texts", () => {
    render(
      <Provider store={store}>
        <PopUp />
      </Provider>
    );
    expect(
      screen.getByText("Editing in Progress. Do you want to leave?")
    ).toBeInTheDocument();
    expect(screen.getByText("YES")).toBeInTheDocument();
    expect(screen.getByText("NO")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("renders modal with dark styles", () => {
    store = mockStore({
      sideBar: {
        isDarkMode: true,
      },
    });
    render(
      <Provider store={store}>
        <PopUp />
      </Provider>
    );
    expect(screen.getByText("X").parentElement?.parentElement).toHaveClass(
      "dark"
    );
  });

  it("calls handle handleBlogSwitch when Yes clicked", () => {
    const handleBlogSwitch = jest.fn();
    render(
      <Provider store={store}>
        <PopUp handleBlogSwitch={handleBlogSwitch} />
      </Provider>
    );
    const yesBtn = screen.getByText("YES");
    fireEvent.click(yesBtn);
    expect(handleBlogSwitch).toHaveBeenCalled();
  });

  it("calls handle handleCancel when No clicked", () => {
    const handleCancel = jest.fn();
    render(
      <Provider store={store}>
        <PopUp handleCancel={handleCancel} />
      </Provider>
    );
    const noBtn = screen.getByText("NO");
    fireEvent.click(noBtn);
    expect(handleCancel).toHaveBeenCalled();
  });

  it("calls handle closeModal when X clicked", () => {
    const closeModal = jest.fn();
    render(
      <Provider store={store}>
        <PopUp closeModal={closeModal} />
      </Provider>
    );
    const closeBtn = screen.getByText("X");
    fireEvent.click(closeBtn);
    expect(closeModal).toHaveBeenCalled();
  });

  it("Matches Snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <PopUp />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
