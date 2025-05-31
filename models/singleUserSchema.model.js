const mongoose = require("mongoose");

const singleUser = new mongoose.Schema({
  questionsAnswers: [
    {
      title: { type: String },
      answer: { type: String },
    },
  ],
});

const SingleUser = mongoose.model("SingleUser", singleUser);
module.exports = SingleUser;
