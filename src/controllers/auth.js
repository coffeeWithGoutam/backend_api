const { StatusCodes } = require("http-status-codes");
const User = require("../models/register");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const shortid = require("shortid");

signUpUser = async (req, res) => {
  const { firstName, lastName, email, mobileNumber, address, block, locality, cityOrDistrict, state, password, confirmPassword, pinCode } = req.body;
  
  if (!firstName || !lastName || !email || !mobileNumber || !address || !block || !locality || !cityOrDistrict || !state || !password || !confirmPassword || !pinCode) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid request'
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
      });
    } else {
      const hash_password = await bcrypt.hash(password, 10);

      const userData = {
        firstName,
        lastName,
        email,
        mobileNumber,
        address,
        block,
        locality,
        cityOrDistrict,
        state,
        hash_password,
        pinCode,
      };

      const newUser = await User.create(userData);

      if (newUser) {
        res.status(StatusCodes.CREATED).json({
          message: "User created Successfully"
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "User registration failed",
        });
      }
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred during user registration",
      error: error.message,
    });
  }
};

signInUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "User does not exist..!",
      });
    }

    if (await user.authenticate(req.body.password)) {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      const { _id, firstName, lastName, email } = user;

      return res.status(StatusCodes.OK).json({
        token,
        user: { _id, firstName, lastName, email },
      });
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Invalid password",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

module.exports = {signUpUser,signInUser};
