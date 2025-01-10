import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../home";

jest.mock("../../../containers/side-bar/side-bar", () =>
  jest.fn(() => <div>Mocked SideBar</div>)
);
jest.mock("../../../containers/blog-list/blog-list", () =>
  jest.fn(() => <div>Mocked BlogList</div>)
);
jest.mock("../../../containers/blog-details/blog-details", () =>
  jest.fn(() => <div>Mocked BlogDetails</div>)
);

describe("Home Component", () => {
  it("renders all child components", () => {
    render(<Home />);

    expect(screen.getByText("Mocked SideBar")).toBeInTheDocument();
    expect(screen.getByText("Mocked BlogList")).toBeInTheDocument();
    expect(screen.getByText("Mocked BlogDetails")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
