const user = require("../models/user");

module.exports = home = (req, res) => {
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
      res.render("home", data);
    })
    .catch((error) => {
      let locals = {
        error: error.message,
        success: "",
      };
      return res.render("error", locals);
    });

  //return res.json(req.session.isLogin);
};
