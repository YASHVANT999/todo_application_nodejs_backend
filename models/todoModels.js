const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  taskName: {
    required: true,
    type: String,
    trim: true,
  },
  taskDeadlineDate: {
    required: true,
    type: Date,
  },
  taskDeadlineTime: {
    reuired: true,
    type: String,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
