import { addIdToTeasers } from "./addIdToTeasers";
import { ShortTeasersIF, TeaserWithIDIF } from "../modals/teaserModal";

describe("addIdToTeasers", () => {
  it("should add an id to each teaser in the array", () => {
    const teasers: ShortTeasersIF[] = [
      {
        posterImg: "Teaser 1",
        movieName: "Description 1",
        videoUrl: "sample.com",
      },
      {
        posterImg: "Teaser 2",
        movieName: "Description 2",
        videoUrl: "sample.com",
      },
      {
        posterImg: "Teaser 3",
        movieName: "Description 3",
        videoUrl: "sample.com",
      },
    ];

    const expected: TeaserWithIDIF[] = [
      {
        posterImg: "Teaser 1",
        movieName: "Description 1",
        videoUrl: "sample.com",
        id: "teaser_1",
      },
      {
        posterImg: "Teaser 2",
        movieName: "Description 2",
        videoUrl: "sample.com",
        id: "teaser_2",
      },
      {
        posterImg: "Teaser 3",
        movieName: "Description 3",
        videoUrl: "sample.com",
        id: "teaser_3",
      },
    ];
    const result = addIdToTeasers(teasers);
    expect(result).toEqual(expected);
  });

  it("should return an empty array if no teasers are provided", () => {
    const result = addIdToTeasers([]);
    expect(result).toEqual([]);
  });
});
