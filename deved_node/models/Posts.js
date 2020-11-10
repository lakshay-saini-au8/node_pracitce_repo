const mongooes = require("mongoose");
const PostSchema = mongooes.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongooes.model("Posts", PostSchema);
