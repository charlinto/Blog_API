const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true
  },
  desc: {
    type: String,
  },
  photo: {
    type: String,
  },
  username: {
    type: String,
    require: true,
  },
  categories: {
    type: [],
  },
},
  { timeStamps: true }
);


module.exports = mongoose.model("Post", PostSchema);