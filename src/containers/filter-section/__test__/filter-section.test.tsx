import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FilterSection from "../filter-section";
import { changeFilter } from "../../../store/blog-list-slice";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

const mockStore = configureStore();

describe("FilterSection Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      blogList: {
        filters: {
          Technology: true,
          Lifestyle: false,
          Health: true,
        },
      },
      sideBar: {
        isDarkMode: false,
      },
    });
    store.dispatch = jest.fn();
  });

  it("renders filter checkboxes with correct initial state", () => {
    render(
      <Provider store={store}>
        <FilterSection />
      </Provider>
    );

    expect(screen.getByLabelText("Technology")).toBeInTheDocument();
    expect(screen.getByLabelText("Lifestyle")).toBeInTheDocument();
    expect(screen.getByLabelText("Health")).toBeInTheDocument();

    expect(screen.getByLabelText("Technology")).toBeChecked();
    expect(screen.getByLabelText("Lifestyle")).not.toBeChecked();
    expect(screen.getByLabelText("Health")).toBeChecked();
  });

  it("dispatches changeFilter action when a checkbox is clicked", () => {
    render(
      <Provider store={store}>
        <FilterSection />
      </Provider>
    );

    const lifestyleCheckbox = screen.getByLabelText("Lifestyle");

    fireEvent.click(lifestyleCheckbox);

    expect(store.dispatch).toHaveBeenCalledWith(changeFilter("Lifestyle"));
  });

  it("applies the correct style based on isDarkMode", () => {
    store = mockStore({
      blogList: {
        filters: {
          Technology: true,
          Lifestyle: false,
          Health: true,
        },
      },
      sideBar: {
        isDarkMode: true,
      },
    });

    render(
      <Provider store={store}>
        <FilterSection />
      </Provider>
    );
    const filterSection = screen.getByText("FILTER").closest("div");
    expect(filterSection).toHaveClass("dark");
  });

  it("Matches Snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <FilterSection />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
