import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import Input from "../input";
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

  it("renders input with light mode styles", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Input
          type="text"
          value="Test Value"
          placeholder="Test Placeholder"
          name="testName"
          isReadOnly={false}
        />
      </Provider>
    );
    const input = screen.getByPlaceholderText("Test Placeholder");
    expect(input).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
    expect(input).toHaveClass("light");
    expect(input).not.toHaveClass("dark");
  });

  it("renders input with dark mode styles", () => {
    store = mockStore({
      sideBar: {
        isDarkMode: true,
      },
    });
    const { asFragment } = render(
      <Provider store={store}>
        <Input
          type="text"
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
    expect(input).toHaveClass("dark");
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with provided props", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Input
          type="text"
          value="Test Value"
          placeholder="Test Placeholder"
          name="testName"
          isReadOnly={false}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Test Placeholder");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("value", "Test Value");
    expect(input).toHaveAttribute("name", "testName");
    expect(input).not.toHaveAttribute("readonly");
    expect(asFragment()).toMatchSnapshot();
  });

  it("handles onChange events", () => {
    const { asFragment } = render(
      <Provider store={store}>

      <Input
        type="text"
        value=""
        placeholder="Test Placeholder"
        onChange={jest.fn()}
      /></Provider>
    );

    const input = screen.getByPlaceholderText("Test Placeholder");
    fireEvent.change(input, { target: { value: "New Value" } });

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies default value correctly", () => {
    const { asFragment } = render(
      <Provider store={store}>

      <Input
        type="text"
        defaultValue="Default Value"
        placeholder="Test Placeholder"
      /></Provider>
    );

    const input = screen.getByPlaceholderText("Test Placeholder");
    expect(input).toHaveAttribute("value", "Default Value");
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders as read-only when isReadOnly is true", () => {
    const { asFragment } = render(
      <Provider store={store}>
      <Input
        type="text"
        isReadOnly={true}
        placeholder="Read-Only Placeholder"
      /></Provider>
    );

    const input = screen.getByPlaceholderText("Read-Only Placeholder");
    expect(input).toHaveAttribute("readonly");
    expect(asFragment()).toMatchSnapshot();
  });

  it("forwards ref to the input element", () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const { asFragment } = render(
      <Provider store={store}>
        <Input type="text" ref={inputRef} placeholder="Test Ref Placeholder" />
      </Provider>
    );

    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(inputRef.current?.placeholder).toBe("Test Ref Placeholder");
    expect(asFragment()).toMatchSnapshot();
  });
});
