import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Modal from "../modal";

const mockStore = configureStore([]);

describe("Model  Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      sideBar: {
        isDarkMode: false,
      },
    });
  });

  it("renders modal with dark mode styles", () => {
    store = mockStore({
      sideBar: {
        isDarkMode: true,
      },
    });
    const { asFragment } = render(
      <Provider store={store}>
        <Modal>
          <div>Content</div>
        </Modal>
      </Provider>
    );
    expect(screen.getByText("Content").parentNode?.parentNode).toHaveClass(
      "dark"
    );
    expect(screen.getByText("Content").parentNode?.parentNode).not.toHaveClass(
      "light"
    );

    expect(asFragment()).toMatchSnapshot();
  });

  jest.useFakeTimers();
  test("calls closeModal when background is clicked", () => {
    const closeModalMock = jest.fn();
    const { asFragment } = render(
      <Provider store={store}>
        <Modal closeModal={closeModalMock}>
          <div>Content</div>
        </Modal>
      </Provider>
    );

    const backgroundDiv = screen.getByText("Content").parentNode?.parentNode;
    if (backgroundDiv) {
      fireEvent.click(backgroundDiv);
    }
    jest.advanceTimersByTime(500);
    expect(closeModalMock).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });

  it("does not call closeModal when content is clicked", () => {
    const closeModalMock = jest.fn();
    const { asFragment } = render(
      <Provider store={store}>
        <Modal closeModal={closeModalMock}>
          <div>Content</div>
        </Modal>
      </Provider>
    );

    const contentDiv = screen.getByText("Content");
    fireEvent.click(contentDiv);
    expect(closeModalMock).toHaveBeenCalledTimes(0);

    expect(asFragment()).toMatchSnapshot();
  });
});
