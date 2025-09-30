import { decodeToken, isTokenValid, getUserRole } from "./jwt";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode");

describe("jwt utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("decodeToken", () => {
    it("returns decoded token when valid", () => {
      const fakeDecoded = { sub: "123" };
      jwtDecode.mockReturnValue(fakeDecoded);

      const result = decodeToken("valid.token.here");
      expect(result).toEqual(fakeDecoded);
      expect(jwtDecode).toHaveBeenCalledWith("valid.token.here");
    });

    it("returns null when jwtDecode throws", () => {
      jwtDecode.mockImplementation(() => {
        throw new Error("invalid token");
      });

      const result = decodeToken("invalid.token");
      expect(result).toBeNull();
    });
  });

  describe("isTokenValid", () => {
    it("returns true if token not expired", () => {
      const future = Math.floor(Date.now() / 1000) + 60;
      jwtDecode.mockReturnValue({ exp: future });

      const result = isTokenValid("token");
      expect(result).toBe(true);
    });

    it("returns false if token expired", () => {
      const past = Math.floor(Date.now() / 1000) - 60;
      jwtDecode.mockReturnValue({ exp: past });

      const result = isTokenValid("token");
      expect(result).toBe(false);
    });

    it("returns false if token cannot be decoded", () => {
      jwtDecode.mockImplementation(() => {
        throw new Error("bad");
      });

      const result = isTokenValid("bad-token");
      expect(result).toBe(false);
    });
  });

  describe("getUserRole", () => {
    it("returns role if present", () => {
      jwtDecode.mockReturnValue({ role: "admin" });
      expect(getUserRole("token")).toBe("admin");
    });

    it("returns null if role missing", () => {
      jwtDecode.mockReturnValue({});
      expect(getUserRole("token")).toBeNull();
    });

    it("returns null if token cannot be decoded", () => {
      jwtDecode.mockImplementation(() => {
        throw new Error("oops");
      });
      expect(getUserRole("bad")).toBeNull();
    });
  });
});
