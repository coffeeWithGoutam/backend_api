const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/auth");
const {
  validateSignUpRequest,
  validateSignInRequest,
  isRequestValidated,
} = require("../validators/auth");

// Use a more consistent route structure
router.post("/signin", validateSignInRequest, isRequestValidated, signIn);
router.post("/signup", validateSignUpRequest, isRequestValidated, signUp);

module.exports = router;
