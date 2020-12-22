var nodemailer = require("nodemailer");

function EmailSend(subject, message, emailToSend) {
  return new Promise((reslove, reject) => {
    // console.log("email method reached")
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 587,
      secure: false,
      auth: {
        user: "userofclans1@gmail.com",
        pass: "vasantvasu12",
      },
    });

    var mailOptions = {
      from: "userofclans1@gmail.com",
      to: emailToSend,
      subject: subject,
      text: message,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return reject(error);
      } else {
        console.log(info);
        return reslove(info.response);
      }
    });
  });
}

module.exports = EmailSend;
