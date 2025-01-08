import { ref, set, get } from "firebase/database";
import { BlogsDatabase } from "../firebase";
import { updateBlogs } from "../blog-add-update"; // Adjust this path as needed
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

    // Mock Firebase `ref`
    (ref as jest.Mock).mockReturnValue(mockRef);

    // Mock Firebase `set`
    (set as jest.Mock).mockResolvedValue(null);

    // Mock Firebase `get`
    (get as jest.Mock).mockResolvedValue(mockSnapshot);
  });

  it("should update blogs and return updated data when snapshot exists", async () => {
    // Arrange: Mock snapshot to return data
    mockSnapshot.exists.mockReturnValue(true);
    mockSnapshot.val.mockReturnValue(mockData);

    // Act: Call the function
    const result = await updateBlogs(mockData);

    // Assert: Verify Firebase interactions
    expect(ref).toHaveBeenCalledWith(BlogsDatabase, "/");
    expect(set).toHaveBeenCalledWith(mockRef, mockData);
    expect(get).toHaveBeenCalledWith(mockRef);

    // Assert: Verify returned data
    expect(result).toEqual(mockData);
  });

  it("should return null when snapshot does not exist", async () => {
    // Arrange: Mock snapshot to simulate no data
    mockSnapshot.exists.mockReturnValue(false);

    // Act: Call the function
    const result = await updateBlogs(mockData);

    // Assert: Verify interactions and return value
    expect(ref).toHaveBeenCalledWith(BlogsDatabase, "/");
    expect(set).toHaveBeenCalledWith(mockRef, mockData);
    expect(get).toHaveBeenCalledWith(mockRef);
    expect(result).toBeNull();
  });

  it("should handle errors thrown during execution", async () => {
    // Arrange: Simulate an error during `set`
    const error = new Error("Failed to set data");
    (set as jest.Mock).mockRejectedValue(error);

    // Act & Assert: Verify that the function throws an error
    await expect(updateBlogs(mockData)).rejects.toThrow("Failed to set data");

    // Assert: Ensure `ref` and `set` were called before the error occurred
    expect(ref).toHaveBeenCalledWith(BlogsDatabase, "/");
    expect(set).toHaveBeenCalledWith(mockRef, mockData);
  });
});
