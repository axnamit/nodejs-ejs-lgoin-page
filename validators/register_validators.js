const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (data) => {
  let errors = "";
  let emailValid = true;
  let passwordValid = true;
  let overallvalidator = true;

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";

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
  if (validator.isEmpty(data.firstName)) {
    errors = "first name filed is required";
    overallvalidator = false;
  }
  if (validator.isEmpty(data.lastName)) {
    errors = "last name  filed is required";
    overallvalidator = false;
  }
  if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors = "password length must be 6 to 20 ";
    passwordValid = false;
  }

  return {
    errors,
    passwordValid,
    emailValid,
    overallvalidator,
  };
};
