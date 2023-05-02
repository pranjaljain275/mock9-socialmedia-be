const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: String,
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ user: String }],
    comments: [
      {
        user: String,
        text: String,
        createdAt: Date,
      },
    ],
  },
  {
    versionKey: false,
    createdAt: true
  }
);

const Postmodel = mongoose.model("Post", postSchema);

module.exports = {
    Postmodel,
};
