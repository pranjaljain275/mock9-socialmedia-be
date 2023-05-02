const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{post: String}],
    friends: [{userID: String}],
    friendRequests: [{userID: String}],
  },
  {
    versionKey: false,
  }
);
// { type: mongoose.Schema.Types.ObjectId, ref: "User" }
const Usermodel = mongoose.model("User", userSchema);

module.exports = {
  Usermodel,
};
