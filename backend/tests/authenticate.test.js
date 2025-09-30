const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

describe("authenticate middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { header: jest.fn() };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("returns 401 if no Authorization header", () => {
    req.header.mockReturnValue(null);

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Access denied, no token provided",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 if malformed Authorization header", () => {
    req.header.mockReturnValue("Token abc");

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Malformed token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 if token is invalid", () => {
    req.header.mockReturnValue("Bearer invalidtoken");
    jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
      throw new Error("invalid signature");
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("attaches user to req and calls next if token is valid", () => {
    const fakeUser = { id: "123", role: "admin" };
    const token = jwt.sign(fakeUser, process.env.JWT_SECRET || "testsecret");

    req.header.mockReturnValue(`Bearer ${token}`);

    authenticate(req, res, next);

    expect(req.user).toMatchObject(fakeUser);
    expect(next).toHaveBeenCalled();
  });
});
