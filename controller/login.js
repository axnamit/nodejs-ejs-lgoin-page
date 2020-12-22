const user = require("../models/user");

module.exports = (req, res) => {
  if (req.session.isLogin) {
    let email = req.session.email;

    user
      .findOne({ email })
      .then((resposne) => {
        let data = {
          success: true,
          message: "user login",
          data: {
            firstname: resposne.firstName,
            lastname: resposne.lastName,
            email: resposne.email,
          },
        };
        return res.render("home", data);
      })
      .catch((error) => {
        let locals = {
          error: error.message,
          success: "",
        };
        return res.render("error", locals);
      });
  } else {
    var terms1 = "kldfjld";
    res.render("login", {
      terms1,
    });
  }
};
