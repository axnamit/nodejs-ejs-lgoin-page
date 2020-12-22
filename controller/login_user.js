const { response } = require("express");
const user = require("../models/user");
const login_validators = require("../validators/login_validators");
const bycrpypt = require("bcryptjs");
module.exports = login_user = (req, res) => {
  // req.body object has your form values

  let data = {
    email: req.body.username,
    password: req.body.password,
  };

  let d = login_validators(data);

  if (d.emailValid == true && d.passwordValid) {
    user
      .findOne({ email: data.email })
      .then((response) => {
        console.log(response);
        if (response) {
          bycrpypt
            .compare(data.password, response.password)
            .then((isMatched) => {
              if (isMatched) {
                req.session.isLogin = true;
                req.session.email = data.email;

                let dd = {
                  success: true,
                  message: "user login",
                  data: {
                    firstname: response.firstName,
                    lastname: response.lastName,
                    email: response.email,
                  },
                };
                return res.render("home", dd);
              } else {
                let locals = {
                  error: "password did not match.",
                  success: "",
                };
                return res.render("login", locals);
              }
            });
          //return res.json(response);
        } else {
          let locals = {
            error: "user not exist",
            success: "",
          };
          return res.render("login", locals);
        }
      })
      .catch((error) => {
        let locals = {
          error: error.message,
          success: "",
        };
        return res.render("login", locals);
      });
  } else {
    // return res.json(d);

    let locals = {
      error: d.errors,
      success: "",
    };
    return res.render("login", locals);
  }
};
