const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Each application record stores a job application and links it to the owning user.
const applicationSchema = new mongoose.Schema({
  title: String,
  company: String,
  date: Date,
  status: String,
  location: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

applicationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Application", applicationSchema);
