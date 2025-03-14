const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const getToken = require("../utils/token");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = getToken(userForToken);
  response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
