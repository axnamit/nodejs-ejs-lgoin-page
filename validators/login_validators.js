const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (data) => {
  let errors = "";
  let emailValid = true;
  let passwordValid = true;

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors = "email filed is required";
    emailValid = false;
  } else if (!validator.isEmail(data.email)) {
    errors = "email is not valid";
    emailValid = false;
  }

  if (validator.isEmpty(data.password)) {
    errors = "password filed is required";
    passwordValid = false;
  }
  if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors = "password length must be 6 to 20 ";
    passwordValid = false;
  }

  return {
    errors,
    passwordValid,
    emailValid,
  };
};
