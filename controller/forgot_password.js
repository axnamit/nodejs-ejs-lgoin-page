const validator = require("validator");
const isEmpty = require("is-empty");
const user = require("../models/user");
const EmailSend = require("../email/email");
const emailsend = require("./emailsend");
const otpschema = require("../models/otpschema");

module.exports = forgot_password = (req, res) => {
  let email = req.body.email;
  if (validator.isEmpty(email)) {
    return res.render("email_send.ejs", {
      errors: "Please enter valid email",
    });
  } else if (!validator.isEmail(email)) {
    let locals = {
      error: "email is not valid",
      success: "",
    };
    return res.render("email_send", locals);
  }

  user
    .findOne({ email })
    .then((response) => {
      if (response) {
        let otp = generateOTP();
        otpschema
          .findOne({ email: email })
          .then((responseOTP) => {
            if (!responseOTP) {
              let otps = new otpschema({
                email: email,
                otp: otp,
                date: new Date(),
              });

              otps
                .save()
                .then((respp) => {
                  //console.log(respp);
                })
                .catch((err) => {
                  //console.log(err);
                });
            } else {
              responseOTP.otp = otp;
              responseOTP.date = new Date();
              responseOTP
                .save()
                .then((resOTP) => {
                  // console.log(resOTP);
                })
                .catch((error) => {
                  //  console.log(error);
                });
            }
          })
          .catch((error) => {
            //console.log(error);
          });
        EmailSend("Forgot password", `here is the otp ${otp}`, email)
          .then((responsefore) => {
            req.session.fge = email;
            return res.render("verify_otp");
          })
          .catch((error) => {
            console.error(error);
            let locals = {
              error: error.message,
              success: "",
            };
            return res.render("email_send", locals);
          });
      } else {
        let locals = {
          error: "email not found",
          success: "",
        };
        return res.render("email_send", locals);
      }
    })
    .catch((error) => {
      let locals = {
        error: error.message,
        success: "",
      };
      return res.render("email_send", locals);
    });
};

function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
