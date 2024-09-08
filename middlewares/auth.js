const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../api/users/users.service");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user = await User.get(decoded.userId);
    next();
  } catch (message) {
    console.log('Authentication error:', message);
    next(new UnauthorizedError(message));
  }
};

