import {
  addTechnology,
  updateTechnology,
  deleteTechnology,
  getTechnologies,
  getPublishedTechnologies,
} from "./technology";

describe("technology API", () => {
  const token = "abc123";
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("addTechnology calls POST and returns data", async () => {
    const data = { name: "React" };
    const response = { _id: "1", ...data };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => response });

    const result = await addTechnology(token, data);
    expect(result).toEqual(response);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8080/technologies",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(data),
      }),
    );
  });

  it("updateTechnology calls PUT and returns data", async () => {
    const id = "1";
    const data = { name: "Vue" };
    const response = { _id: id, ...data };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => response });

    const result = await updateTechnology(token, id, data);
    expect(result).toEqual(response);
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:8080/technologies/${id}`,
      expect.objectContaining({ method: "PUT" }),
    );
  });

  it("deleteTechnology calls DELETE and returns data", async () => {
    const id = "1";
    const response = { success: true };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => response });

    const result = await deleteTechnology(token, id);
    expect(result).toEqual(response);
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:8080/technologies/${id}`,
      expect.objectContaining({ method: "DELETE" }),
    );
  });

  it("getTechnologies calls GET and returns data", async () => {
    const response = [{ _id: "1", name: "React" }];
    fetch.mockResolvedValueOnce({ ok: true, json: async () => response });

    const result = await getTechnologies(token);
    expect(result).toEqual(response);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8080/technologies",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("getPublishedTechnologies calls GET and returns data", async () => {
    const response = [{ _id: "1", name: "Angular" }];
    fetch.mockResolvedValueOnce({ ok: true, json: async () => response });

    const result = await getPublishedTechnologies(token);
    expect(result).toEqual(response);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8080/technologies/published",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("throws when fetch fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false, json: async () => ({}) });
    await expect(addTechnology(token, {})).rejects.toThrow(
      "Failed to add technology",
    );

    fetch.mockResolvedValueOnce({ ok: false, json: async () => ({}) });
    await expect(updateTechnology(token, "1", {})).rejects.toThrow(
      "Failed to update technology",
    );

    fetch.mockResolvedValueOnce({ ok: false, json: async () => ({}) });
    await expect(deleteTechnology(token, "1")).rejects.toThrow(
      "Failed to delete technology",
    );

    fetch.mockResolvedValueOnce({ ok: false, json: async () => ({}) });
    await expect(getTechnologies(token)).rejects.toThrow(
      "Failed to fetch technologies",
    );

    fetch.mockResolvedValueOnce({ ok: false, json: async () => ({}) });
    await expect(getPublishedTechnologies(token)).rejects.toThrow(
      "Failed to fetch technologies",
    );
  });
});
