module.exports = (req, res) => {
  req.session.isLogin = false;
  req.session.email = "";

  return res.render("login", {});
};
