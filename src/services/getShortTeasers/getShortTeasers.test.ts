import axios from "axios";
import { getShortTeasers } from "./getShortTeasers";
import { SHORT_TEASERS_URL } from "../../constants/url-constants";

jest.mock("axios");

describe("getShortTeasers Service", () => {
  const mockTeasersData = [
    {
      id: "teaser_1",
      title: "Teaser 1",
      description: "Description of teaser 1",
    },
    {
      id: "teaser_2",
      title: "Teaser 2",
      description: "Description of teaser 2",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch short teasers data successfully", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockTeasersData });
    const result = await getShortTeasers();
    expect(result).toEqual(mockTeasersData);
    expect(axios.get).toHaveBeenCalledWith(SHORT_TEASERS_URL);
  });

  it("should throw an error when the API request fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch short teasers")
    );
    try {
      await getShortTeasers();
    } catch (error) {
      expect(error).toEqual(new Error("Failed to fetch short teasers"));
    }
    expect(axios.get).toHaveBeenCalledWith(SHORT_TEASERS_URL);
  });
});
