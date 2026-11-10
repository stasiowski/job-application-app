// Manages user registration and user lookup for the application.
const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  // Hash the password before storing it to avoid keeping raw credentials in MongoDB.
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  // Return all registered users together with their application summaries.
  const users = await User.find({}).populate("applications", {
    title: 1,
    company: 1,
    date: 1,
    status: 1,
    location: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
