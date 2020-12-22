const otpschema = require("../models/otpschema");

module.exports = otp_verify = (req, res) => {
  let otp1 = req.body.digit1;
  let otp2 = req.body.digit2;
  let otp3 = req.body.digit3;
  let otp4 = req.body.digit4;

  let otp = `${otp1}${otp2}${otp3}${otp4}`;

  let email = req.session.fge;

  //return res.json(email);

  otpschema
    .findOne({ email })
    .then((resposnse) => {
      if (resposnse) {
        if (resposnse.otp == otp) {
          return res.render("change_password");
        } else {
          let locals = {
            error: "Otp did not match",
            success: "",
          };
          return res.render("verify_otp", locals);
        }
      } else {
        let locals = {
          error: "Otp not found",
          success: "",
        };
        return res.render("verify_otp", locals);
      }
    })
    .catch((error) => {
      return res.json(error);
    });

  //return res.json({ otp1, otp2, otp3, otp4 });
};

function diff_minutes(dt2, dt1) {
  let time1 = new Date(dt1);
  let time2 = new Date(dt2);

  var diff = (time2.getTime() - time1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}
