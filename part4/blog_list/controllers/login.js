const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const { getToken } = require("../utils/token");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  if (user === null) {
    return response.status(400).json({ error: `Username ${username} does not exist` });
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (passwordMatch !== true) {
    return response.status(401).json({ error: "Incorrect password" });
  }

  const tokenData = {
    username: user.username,
    id: user._id,
  };

  const token = getToken(tokenData);
  return response.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
