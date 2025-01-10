import { getAvailableFilters } from "../getAvailableFilters";
import { BlogWithIdIF } from "../../modals/blog-list-modal";

describe("getAvailableFilters", () => {
  it("returns filters with blog types set to true", () => {
    const input: BlogWithIdIF[] = [
      {
        id: "1",
        title: "Blog 1",
        details: "Details 1",
        photo: "photo1.jpg",
        type: "national",
      },
      {
        id: "2",
        title: "Blog 2",
        details: "Details 2",
        photo: "photo2.jpg",
        type: "international",
      },
      {
        id: "3",
        title: "Blog 3",
        details: "Details 3",
        photo: "photo3.jpg",
        type: "national",
      },
    ];

    const expectedOutput = {
      national: true,
      international: true,
    };

    const result = getAvailableFilters(input);

    expect(result).toEqual(expectedOutput);
  });

  it("returns an empty object if input data is empty", () => {
    const input: BlogWithIdIF[] = [];

    const expectedOutput = {};

    const result = getAvailableFilters(input);

    expect(result).toEqual(expectedOutput);
  });

  it("handles input with duplicate blog types", () => {
    const input: BlogWithIdIF[] = [
      {
        id: "1",
        title: "Blog 1",
        details: "Details 1",
        photo: "photo1.jpg",
        type: "national",
      },
      {
        id: "2",
        title: "Blog 2",
        details: "Details 2",
        photo: "photo2.jpg",
        type: "national",
      },
      {
        id: "3",
        title: "Blog 3",
        details: "Details 3",
        photo: "photo3.jpg",
        type: "national",
      },
    ];

    const expectedOutput = {
      national: true,
    };

    const result = getAvailableFilters(input);

    expect(result).toEqual(expectedOutput);
  });
});
