const user = require("../models/user");

module.exports = function (req, res, next) {
  var fullUrl = req.originalUrl;
  console.log(fullUrl);

  if (req.session.isLogin) {
    next();
  } else {
    var terms1 = "kldfjld";

    return res.render("login", { terms1 });
  }
};
/**
 

  if (
      fullUrl == "/regiter" ||
      fullUrl == "/login" ||
      fullUrl == "/login_user" ||
      fullUrl == "/register_user"
    ) {
      console.log("here");
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
      console.log("dkjhsdkj");
      // next();
    }
 */
