import { addUUID } from "../addUUID";

describe("addUUID", () => {
  beforeEach(() => {
    global.crypto.randomUUID = jest
      .fn()
      .mockImplementation(() => "mocked-uuid");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("adds a unique ID to each object in the array", () => {
    const input = [
      { title: "Blog 1", details: "Details 1" },
      { title: "Blog 2", details: "Details 2" },
    ];

    const expectedOutput = [
      { title: "Blog 1", details: "Details 1", id: "mocked-uuid" },
      { title: "Blog 2", details: "Details 2", id: "mocked-uuid" },
    ];

    const result = addUUID(input);

    expect(result).toEqual(expectedOutput);
    expect(result[0].id).toBe("mocked-uuid");
    expect(result[1].id).toBe("mocked-uuid");
    expect(global.crypto.randomUUID).toHaveBeenCalledTimes(2);
  });

  it("returns an empty array if the input is empty", () => {
    const input: object[] = [];

    const result = addUUID(input);

    expect(result).toEqual([]);
    expect(global.crypto.randomUUID).not.toHaveBeenCalled();
  });
});
