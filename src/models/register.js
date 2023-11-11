const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema for user model

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    cityOrDistrict: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Enable timestamps here
);

//for get fullName 
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.method({
  async authenticate(password){
    return bcrypt.compare(password,this.hash_password)
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
