const bycrpypt = require("bcryptjs");
const user = require("../models/user");

module.exports = change_password = (req, res) => {
  let pass1 = req.body.password1;
  let pass2 = req.body.password2;

  if (pass1 == pass2) {
    let email = req.session.fge;

    bycrpypt.genSalt(10, (err, salt) => {
      bycrpypt.hash(pass1, salt, (err, hash) => {
        if (err) {
          let locals = {
            error: err.message,
            success: "",
          };
          return res.render("change_password", locals);
        }
        user
          .findOne({ email })
          .then((response) => {
            response.password = hash;
            response
              .save()
              .then((responseaftere) => {
                let locals = {
                  error: null,
                  success: "password changed successfully",
                };
                return res.render("login", locals);
              })
              .catch((error) => {
                let locals = {
                  error: error.message,
                  success: "",
                };
                return res.render("change_password", locals);
              });
          })
          .catch((error) => {
            let locals = {
              error: error.message,
              success: "",
            };
            return res.render("change_password", locals);
          });
      });
    });
  } else {
    let locals = {
      error: "password did not matched",
      success: "",
    };
    return res.render("change_password", locals);
  }
};
