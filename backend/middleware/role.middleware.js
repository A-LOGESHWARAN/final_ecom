module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Role missing" });
    }

    const userRole = req.user.role.toUpperCase();

    if (!allowedRoles.map(r => r.toUpperCase()).includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
