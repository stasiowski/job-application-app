const applicationRouter = require("express").Router();
const Application = require("../models/application");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Returns token from request authorization param
function getTokenFrom(request) {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
}

//Gets token from body, verifies it, finds user in db
async function getUserFromToken(request) {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return null;
  }
  const user = await User.findById(decodedToken.id);
  return user;
}
// Returns all applications as json
applicationRouter.get("/", async (request, response) => {
  try {
    const user = await getUserFromToken(request);

    if (!user) {
      return response.status(401).json({
        error: "User not found or token invalid",
      });
    }

    const apps = await Application.find({ user: user._id }).populate("user", {
      username: 1,
      passwordHash: 1,
    });

    response.json(apps);
  } catch (error) {
    return response.status(401).json({
      error: "Token missing, invalid or expired",
    });
  }
});
// Creates new Application
applicationRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await getUserFromToken(request);

  if (!user) {
    return response.status(400).json({ error: "userID is invalid/missing" });
  }

  if (!request.body) {
    return response.status(400).json({ error: "backend body not found" });
  }

  const newApp = new Application({
    title: body.title,
    company: body.company,
    date: body.date,
    status: body.status,
    location: body.location,
    user: user._id,
  });
  //saves to mongodb db
  const savedApplication = await newApp.save();
  user.applications = user.applications.concat(newApp.id);
  await user.save();
  return response.status(201).json(savedApplication);
});

// Updates Application
applicationRouter.put("/:id", async (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({ error: "backend body not found" });
  }

  const updatedApplication = await Application.findByIdAndUpdate(
    request.params.id,
    {
      title: body.title,
      company: body.company,
      date: body.date,
      status: body.status,
      location: body.location,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedApplication) {
    return response.status(404).json({ error: "application not found" });
  }

  return response.status(200).json(updatedApplication);
});

// Deletes Application
applicationRouter.delete("/:id", async (request, response) => {
  const deletedApp = await Application.findByIdAndDelete(request.params.id);
  return response.status(204).json(deletedApp);
});
//Exports router
module.exports = applicationRouter;
