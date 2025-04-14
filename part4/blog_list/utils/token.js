const jwt = require("jsonwebtoken");

const getToken = (tokenData) => {
  return jwt.sign(tokenData, process.env.SECRET, { expiresIn: 60 * 60 });
};

module.exports = {
  getToken,
};
