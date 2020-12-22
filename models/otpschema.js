const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const otpSave = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  date: { type: Date },
});

module.exports = otpsave = mongoose.model("otp_save", otpSave);
