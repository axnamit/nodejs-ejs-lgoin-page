var express = require("express");
const change_password = require("../controller/change_password");
const emailsend = require("../controller/emailsend");
const forgot_password = require("../controller/forgot_password");
const home = require("../controller/home");
const login = require("../controller/login");
const login_user = require("../controller/login_user");
const logout = require("../controller/logout");
const otp_verify = require("../controller/otp_verify");
const register = require("../controller/register");
const register_user = require("../controller/register_user");
const checksession = require("../middleware/checksession");
var router = express.Router();

router.get("/login", login);

router.get("/register", register);

router.post("/login_user", login_user);

router.post("/register_user", register_user);

router.get("/", checksession, home);

router.post("/logout", logout);

router.get("/email", emailsend);

router.post("/forget_password", forgot_password);

router.post("/otp_verify", otp_verify);

router.post("/change_password", change_password);

module.exports = router;
