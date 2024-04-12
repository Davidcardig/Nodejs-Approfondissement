const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const user = require("../api/users/users.model");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    const user = user.find(decoded.id);//récupère l'utilisateur
    if (!user) {
      throw "user not found";
    }
    req.user = decoded;
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
