import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CheckBox from "../check-box";

const mockStore = configureStore([]);

describe("CheckBox Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      sideBar: {
        isDarkMode: false,
      },
    });
  });

  it("renders the checkbox with the correct label and default light mode", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <CheckBox label="Test Checkbox" value={false} handleChange={() => {}} />
      </Provider>
    );

    const checkbox = screen.getByLabelText("Test Checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    const wrapper = checkbox.parentElement;
    expect(wrapper).toHaveClass("checkBoxWrapper");
    expect(wrapper).toHaveClass("light");
    expect(wrapper).not.toHaveClass("dark");

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies dark mode styles when isDarkMode is true", () => {
    store = mockStore({
      sideBar: {
        isDarkMode: true,
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <CheckBox label="Test Checkbox" value={true} handleChange={() => {}} />
      </Provider>
    );

    const checkbox = screen.getByLabelText("Test Checkbox");
    const wrapper = checkbox.parentElement;
    expect(wrapper).toHaveClass("dark");
    expect(wrapper).not.toHaveClass("light");

    expect(asFragment()).toMatchSnapshot();
  });

  it("triggers handleChange function when checkbox state changes", () => {
    const handleChange = jest.fn();

    const { asFragment } = render(
      <Provider store={store}>
        <CheckBox
          label="Test Checkbox"
          value={false}
          handleChange={handleChange}
        />
      </Provider>
    );

    const checkbox = screen.getByLabelText("Test Checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });

  it("reflects the correct checked state based on the value prop", () => {
    const { rerender, asFragment } = render(
      <Provider store={store}>
        <CheckBox label="Test Checkbox" value={false} handleChange={() => {}} />
      </Provider>
    );

    const checkbox = screen.getByLabelText("Test Checkbox");
    expect(checkbox).not.toBeChecked();

    rerender(
      <Provider store={store}>
        <CheckBox label="Test Checkbox" value={true} handleChange={() => {}} />
      </Provider>
    );

    expect(checkbox).toBeChecked();

    expect(asFragment()).toMatchSnapshot();
  });
});
