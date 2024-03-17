const express = require("express");

const todoRouter = express.Router();
const Todo = require("../models/todoModels.js");

todoRouter.post("/api/add-task", async (req, res) => {
  try {
    const { taskName, taskDate, taskTime } = req.body;

    if (taskName == null) {
      return res.json({ msg: "Task Name is Required" });
    }

    if (taskDate == null) {
      return res.json({ msg: "Task Date is Required" });
    }

    if (taskTime == null) {
      return res.json({ msg: "Task Time is Required" });
    }

    let todo = new Todo({
      taskName: taskName,
      taskDeadlineDate: taskDate,
      taskDeadlineTime: taskTime,
    });

    console.log(todo);
    todo = await todo.save();
    console.log(todo);
    return res
      .status(200)
      .json({ msg: "Task Created Successfully", data: todo });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

todoRouter.get("/api/all-tasks", async (req, res) => {
  try {
    const allTask = await Todo.find({});
    res.json(allTask);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

todoRouter.get("/api/fetch-task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    return res.status(200).json(todo);
  } catch (e) {
    return res.json({ error: e.message });
  }
});

todoRouter.delete("/api/delete-task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ msg: "Task Deleted Successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

todoRouter.put("/api/update-task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, taskDate, taskTime } = req.body;
    await Todo.findByIdAndUpdate(id, {
      taskName: taskName,
      taskDeadlineDate: taskDate,
      taskDeadlineTime: taskTime,
    });
    return res.status(200).json({ msg: "Task Updated Successfully" });
  } catch (e) {
    return res.json({ error: e.message });
  }
});

todoRouter.post("/api/test", async (req, res) => {
  try {
    console.log(req.body);
    // return res.status(200).json({ msg: "Task Updated Successfully" });
  } catch (e) {
    return res.json({ error: e.message });
  }
});

module.exports = todoRouter;
