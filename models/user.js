const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    uppercase: false,
  },

  has_access: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  token: {
    type: String,
    default: "",
  },
});
module.exports = User = mongoose.model("user", userSchema);
