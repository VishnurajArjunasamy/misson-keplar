import { ref, set, get } from "firebase/database";
import { BlogsDatabase } from "../firebase";
import { updateBlogs } from "../blog-add-update";
import { BlogWithIdIF } from "../../modals/blog-list-modal";

jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
}));

jest.mock("../firebase", () => ({
  BlogsDatabase: jest.fn(),
}));

describe("updateBlogs", () => {
  const mockData: BlogWithIdIF[] = [
    {
      id: "1",
      title: "Test Blog",
      details: "Test Details",
      type: "test",
      photo: "test",
    },
    {
      id: "2",
      title: "Another Blog",
      details: "More Details",
      type: "test",
      photo: "test",
    },
  ];

  const mockRef = { key: "/" };
  const mockSnapshot = {
    exists: jest.fn(),
    val: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (ref as jest.Mock).mockReturnValue(mockRef);

    (set as jest.Mock).mockResolvedValue(null);

    (get as jest.Mock).mockResolvedValue(mockSnapshot);
  });

  it("should update blogs and return updated data when snapshot exists", async () => {
    mockSnapshot.exists.mockReturnValue(true);
    mockSnapshot.val.mockReturnValue(mockData);

    const result = await updateBlogs(mockData);

    expect(ref).toHaveBeenCalledWith(BlogsDatabase, "/");
    expect(set).toHaveBeenCalledWith(mockRef, mockData);
    expect(get).toHaveBeenCalledWith(mockRef);

    expect(result).toEqual(mockData);
  });

  it("should return null when snapshot does not exist", async () => {
    mockSnapshot.exists.mockReturnValue(false);

    const result = await updateBlogs(mockData);

    expect(ref).toHaveBeenCalledWith(BlogsDatabase, "/");
    expect(set).toHaveBeenCalledWith(mockRef, mockData);
    expect(get).toHaveBeenCalledWith(mockRef);
    expect(result).toBeNull();
  });

  it("should handle errors thrown during execution", async () => {
    const error = new Error("Failed to set data");
    (set as jest.Mock).mockRejectedValue(error);

    await expect(updateBlogs(mockData)).rejects.toThrow("Failed to set data");

    expect(ref).toHaveBeenCalledWith(BlogsDatabase, "/");
    expect(set).toHaveBeenCalledWith(mockRef, mockData);
  });
});
