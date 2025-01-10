import axios from "axios";
import { fetchBlogList } from "../blog-list";
import { addUUID } from "../../utils/addUUID";
import { BlogIF } from "../../modals/blog-list-modal";

jest.mock("axios");
jest.mock("../../utils/addUUID");

describe("fetchBlogList", () => {
  it("fetches blog list and adds UUIDs to each blog", async () => {
    const mockBlogs: BlogIF[] = [
      { title: "Blog 1", details: "Details 1", photo: "Photo 1", type: "Type 1" },
      { title: "Blog 2", details: "Details 2", photo: "Photo 2", type: "Type 2" },
    ];

    const mockBlogWithUUID = [
      { id: "uuid-1", ...mockBlogs[0] },
      { id: "uuid-2", ...mockBlogs[1] },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockBlogs });

    (addUUID as jest.Mock).mockReturnValue(mockBlogWithUUID);

    const result = await fetchBlogList();

    expect(axios.get).toHaveBeenCalledWith(
      "https://littlebook-60555-default-rtdb.firebaseio.com/.json"
    );
    expect(addUUID).toHaveBeenCalledWith(mockBlogs);
    expect(result).toEqual(mockBlogWithUUID);
  });

  it("throws an error when API call fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    await expect(fetchBlogList()).rejects.toThrow("API Error");
    expect(axios.get).toHaveBeenCalledWith(
      "https://littlebook-60555-default-rtdb.firebaseio.com/.json"
    );
  });
});
