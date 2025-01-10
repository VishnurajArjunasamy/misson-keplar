import axios from "axios";
import { getMemebers } from "../members";
import { MembersIF } from "../../modals/members-modal";
import { MEMBERS_URL } from "../../constants/url.constants";

jest.mock("axios");

describe("getMemebers", () => {
  it("fetches members successfully and returns the data", async () => {
    const mockMembers: MembersIF[] = [
      {
        address: {
          city: "Bangalore",
          geo: {
            lat: "12.9716N",
            lng: "77.5946E",
          },
          street: "John Street",
          suite: "Apt. 516",
          zip: "500001",
        },
        company: {
          location: "Bangalore",
          name: "ABC Company",
        },
        email: "mark.antony@company.biz",
        id: 1,
        name: "Mark Antony",
        phone: "9876543210",
        photo:
          "https://plus.unsplash.com/WFyY2h8NDl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        username: "markantony",
        website: "meetmarkantony.com",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockMembers });

    const result = await getMemebers();

    expect(axios.get).toHaveBeenCalledWith(`${MEMBERS_URL}/.json`);
    expect(result).toEqual(mockMembers);
  });

  it("throws an error when the API call fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    await expect(getMemebers()).rejects.toThrow("API Error");
    expect(axios.get).toHaveBeenCalledWith(`${MEMBERS_URL}/.json`);
  });
});
