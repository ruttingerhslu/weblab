const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      console.log(req.user);
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};

export default authorize;
