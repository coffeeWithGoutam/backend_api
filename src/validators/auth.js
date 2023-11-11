const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

// SignUp Validation Check
const validateSignUpRequest = [
  // name
  check("firstName").notEmpty().withMessage("First Name required"),
  check("lastName").notEmpty().withMessage("Last Name required"),
  check("email").isEmail().withMessage("Valid Email required"),
  check("password").isLength({min: 6}).withMessage("Password must be at least 6 character"),
  check("pinCode").notEmpty().withMessage("Pin Code is required"),
  check("confirmPassword").isLength({min: 6}).withMessage("Password must be at least 6 character").custom((value, {req}) => {
    if(value !== req.body.password){
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

//SignIn 
const validateSignInRequest = [
  check("email").isEmail().withMessage("Valid Email required"),
  check("password").isEmpty().withMessage("Password Must be required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const isRequestValidated = (req,res,next) => {
  const errors = validationResult(req);
  
  if(errors.array().length > 0){
    return res.status(StatusCodes.BAD_REQUEST).json({error: errors.array()[0].msg});
  }
  next();
};

module.exports = {
  validateSignUpRequest,
  validateSignInRequest,
  isRequestValidated
};

// console.log(typeof validateSignUpRequest); // Should log 'function'

// setTimeout(() => {
//   console.log(typeof validateSignInRequest); // Should log 'function'
// }, 10);

// setTimeout(() => {
//   console.log(typeof isRequestValidated); // Should log 'function'
// }, 20);





