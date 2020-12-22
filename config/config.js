require("dotenv").config();

// Read the config and other information from env file
var mode = process.env.MODE;
var db_type = process.env.DB_TYPE;

var mail_username = process.env.TO_SEND_MAIL;
var mail_password = process.env.MAIL_PASSWORD;
var owner_mail = process.env.OWNER_EMAIL_ID;

var can_send_email_to_new_user = process.env.SEND_EMAIL_TO_USER;
var can_send_email_to_owner = process.env.SEND_EMAIL_TO_OWNER;
//var baseurl = req.protocol+"://"+req.headers.host;

if (mode == "production") {
  db_host = process.env.DB_HOST_PRODUCTION;
  db_port = process.env.DB_PORT_PRODUCTION;
  db_uri = process.env.DB_URI_PRODUCTION;
  db_secret = process.env.DB_SECRET_PRODUCTION;
} else {
  db_host = process.env.DB_HOST_DEVELOPMENT;
  db_port = process.env.DB_PORT_DEVELOPMENT;
  db_uri = process.env.DB_URI_DEVELOPMENT;
  db_secret = process.env.DB_SECRET_DEVELOPMENT;
}

module.exports = {
  mongoURI: db_type + "://" + db_host + ":" + db_port + "/" + db_uri,
  secertOrKey: db_secret,
  mail_username: mail_username,
  mail_password: mail_password,
  owner_email: owner_mail,
  can_send_email_to_new_user: can_send_email_to_new_user,
  can_send_email_to_owner: can_send_email_to_owner,
};
