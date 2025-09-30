import { login } from "./auth";

describe("login", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("resolves with data when fetch is ok", async () => {
    const mockResponse = { token: "abc123" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await login({ email: "test@test.com", password: "pass" });
    expect(data).toEqual(mockResponse);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8080/auth/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@test.com", password: "pass" }),
      }),
    );
  });

  it("throws an error when fetch is not ok", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(login({ email: "a", password: "b" })).rejects.toThrow(
      "Login failed",
    );
  });
});
