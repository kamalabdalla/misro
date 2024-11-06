const roles = {
  client: ['client'],
  loan_officer: ['client', 'loan_officer'],
  admin: ['client', 'loan_officer', 'admin']
};

// Middleware to authorize based on role
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: You do not have the necessary permissions.' });
    }
  };
};

module.exports = authorize;
