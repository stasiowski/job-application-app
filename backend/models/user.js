const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// The user document keeps authentication data and the list of application references.
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: String,
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
