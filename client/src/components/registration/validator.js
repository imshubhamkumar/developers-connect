const validator = require("validator");

const validateSignUpForm = payload => {
  const errors = {};
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.fullName !== "string" ||
    payload.fullName.trim().length === 0
  ) {
    isFormValid = false;
    errors.fullName = "Please provide a user name.";
  }

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = "Password must have at least 8 characters.";
  }

//   if (!payload || payload.pwconfirm !== payload.password) {
//     isFormValid = false;
//     errors.pwconfirm = "Password confirmation doesn't match.";
//   }

  if (
    !payload ||
    typeof payload.location !== "string" ||
    payload.location.trim().length === 0
  ) {
    isFormValid = false;
    errors.location = "Please provide your location.";
  }

  if (
    !payload ||
    typeof payload.education !== "string" ||
    payload.education.trim().length === 0
  ) {
    isFormValid = false;
    errors.education = "Please provide your education.";
  }

  if (
    !payload ||
    typeof payload.university !== "string" ||
    payload.university.trim().length === 0
  ) {
    isFormValid = false;
    errors.university = "Please provide your university name.";
  }

  if (
    !payload ||
    typeof payload.cs !== "string" ||
    payload.cs.trim().length === 0
  ) {
    isFormValid = false;
    errors.cs = "Please provide numbers for chanllenges you solved.";
  }

  if (
    !payload ||
    typeof payload.ss !== "string" ||
    payload.ss.trim().length === 0
  ) {
    isFormValid = false;
    errors.ss = "Please provide numbers of solution you submited";
  }

  if (
    !payload ||
    typeof payload.ds !== "string" ||
    payload.ds.trim().length === 0
  ) {
    isFormValid = false;
    errors.ds = "Please provide proficiancy in data stucture";
  }

  if (
    !payload ||
    typeof payload.cpp !== "string" ||
    payload.cpp.trim().length === 0
  ) {
    isFormValid = false;
    errors.cpp = "Please provide proficiancy in C++";
  }

  if (
    !payload ||
    typeof payload.html !== "string" ||
    payload.html.trim().length === 0
  ) {
    isFormValid = false;
    errors.html = "Please provide proficiancy in html";
  }
  if (
    !payload ||
    typeof payload.js !== "string" ||
    payload.js.trim().length === 0
  ) {
    isFormValid = false;
    errors.js = "Please provide proficiancy in javascript";
  }
  if (
    !payload ||
    typeof payload.java !== "string" ||
    payload.java.trim().length === 0
  ) {
    isFormValid = false;
    errors.java = "Please provide proficiancy in java";
  }

  if (
    !payload ||
    typeof payload.py !== "string" ||
    payload.py.trim().length === 0
  ) {
    isFormValid = false;
    errors.py = "Please provide proficiancy in python";
  }
  if (
    !payload ||
    typeof payload.algo !== "string" ||
    payload.algo.trim().length === 0
  ) {
    isFormValid = false;
    errors.algo = "Please provide proficiancy in algorithms";
  }
  
  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

module.exports = {
    validateSignUpForm: validateSignUpForm
  };