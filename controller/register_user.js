const user = require("../models/user");
const register_validators = require("../validators/register_validators");

const bycrpypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = register_user = (req, res) => {
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  //return res.json(data);
  let valid = register_validators(data);

  if (
    valid.overallvalidator == true &&
    valid.emailValid == true &&
    valid.passwordValid == true
  ) {
    user
      .findOne({ email: data.email })
      .then((resposne) => {
        if (resposne) {
          let locals = {
            error: "email already exist",
            success: "",
          };
          return res.render("register", locals);
        } else {
          bycrpypt.genSalt(10, (err, salt) => {
            bycrpypt.hash(data.password, salt, (err, hash) => {
              if (err) {
                let locals = {
                  error: err.message,
                  success: "",
                };
                return res.render("register", locals);
              }

              let newUser = user({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: hash,
              });

              newUser
                .save()
                .then((saveresposne) => {
                  let locals = {
                    error: null,
                    success: "You are registred",
                  };
                  return res.render("login", locals);
                })
                .catch((error) => {
                  let locals = {
                    error: error.message,
                    success: "",
                  };
                  return res.render("register", locals);
                });
            });
          });
        }
      })
      .catch((error) => {
        let locals = {
          error: error.message,
          success: "",
        };
        return res.render("register", locals);
      });
  } else {
    let locals = {
      error: valid.errors,
      success: "",
    };
    return res.render("register", locals);
  }
};
