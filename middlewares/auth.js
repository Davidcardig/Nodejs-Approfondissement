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
    const user = await User.get(decoded.userId);
    if (!user) {
      throw "user not found";
    }
    req.user = decoded;
    next();
  } catch (message) {
    console.log('Authentication error:', message);
    next(new UnauthorizedError(message));
  }
};
