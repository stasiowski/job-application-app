const applicationRouter = require("express").Router();
const Application = require("../models/application");

// Returns all applications as json
applicationRouter.get("/", async (request, response) => {
  //finds all applications in mongodb db
  const apps = await Application.find({});
  response.json(apps);
});
// Creates new Application
applicationRouter.post("/", async (request, response) => {
  // gets body from request as json
  const body = request.body;

  if (!body) {
    return response.status(400).json({ error: "backend body not found" });
  }

  const newApp = new Application({
    title: body.title,
    company: body.company,
    date: body.date,
    status: body.status,
    location: body.location,
  });
  //saves to mongodb db
  const savedApplication = await newApp.save();
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
