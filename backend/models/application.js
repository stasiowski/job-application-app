const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const applicationSchema = new mongoose.Schema({
  title: String,
  company: String,
  date: Date,
  status: String,
  location: String,
});

applicationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Application", applicationSchema);
