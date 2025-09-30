const authorize = require("../middleware/authorize");

describe("authorize middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: null };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("denies access when no user is present", () => {
    const middleware = authorize(["admin"]);
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Forbidden: insufficient role",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("denies access when user has insufficient role", () => {
    req.user = { role: "user" };
    const middleware = authorize(["admin"]);
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Forbidden: insufficient role",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("allows access when user has required role", () => {
    req.user = { role: "admin" };
    const middleware = authorize(["admin"]);
    middleware(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test("allows access when multiple roles are accepted", () => {
    req.user = { role: "editor" };
    const middleware = authorize(["admin", "editor"]);
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
