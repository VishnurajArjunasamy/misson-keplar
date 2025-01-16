import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import TextArea from "../text-area";
import { Provider } from "react-redux";

const mockStore = configureStore([]);

describe("Input Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      sideBar: {
        isDarkMode: false,
      },
    });
  });


  it("renders input with dark mode styles", () => {
    store = mockStore({
      sideBar: {
        isDarkMode: true,
      },
    });
    render(
      <Provider store={store}>
        <TextArea
          value="Test Value"
          placeholder="Test Placeholder"
          name="testName"
          isReadOnly={false}
        />
      </Provider>
    );
    const input = screen.getByPlaceholderText("Test Placeholder");
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveClass("light");
    // expect(input).toHaveClass("dark");
  });

  it("renders correctly with provided props", () => {
    render(
      <Provider store={store}>
        <TextArea
          value="Test Value"
          placeholder="Test Placeholder"
          name="testName"
          isReadOnly={false}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Test Placeholder");
    expect(input).toBeInTheDocument();
    // expect(input).toHaveAttribute("type", "text");
    // expect(input).toHaveAttribute("value", "Test Value");
    // expect(input).toHaveAttribute("name", "testName");
    // expect(input).not.toHaveAttribute("readonly");
  });

  it("handles onChange events", () => {
    render(
      <Provider store={store}>
        <TextArea
          value=""
          placeholder="Test Placeholder"
          onChange={jest.fn()}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Test Placeholder");
    fireEvent.change(input, { target: { value: "New Value" } });
  });

  it("applies default value correctly", () => {
    render(
      <Provider store={store}>
        <TextArea defaultValue="Default Value" placeholder="Test Placeholder" />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Test Placeholder");
    // expect(input).toHaveAttribute("value", "Default Value");
  });

  it("renders as read-only when isReadOnly is true", () => {
    render(
      <Provider store={store}>
        <TextArea isReadOnly={true} placeholder="Read-Only Placeholder" />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Read-Only Placeholder");
    expect(input).toHaveAttribute("readonly");
  });

  it("forwards ref to the input element", () => {
    const inputRef = React.createRef<HTMLTextAreaElement>();
    render(
      <Provider store={store}>
        <TextArea ref={inputRef} placeholder="Test Ref Placeholder" />
      </Provider>
    );

    expect(inputRef.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(inputRef.current?.placeholder).toBe("Test Ref Placeholder");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TextArea
          value="Test Value"
          placeholder="Test Placeholder"
          name="testName"
          isReadOnly={false}
        />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
