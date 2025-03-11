const jwt = require("jsonwebtoken");

const getToken = (userForToken) => {
  return jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });
};

module.exports = getToken;
