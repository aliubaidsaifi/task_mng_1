const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
   userId:String,
  title: String,
  description: String,
  status:Boolean,
});
module.exports = mongoose.model("taskTable", taskSchema);