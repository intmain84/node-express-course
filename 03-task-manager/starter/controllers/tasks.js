const Task = require("../models/Task");
const express = require("express");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).json({
      status: "Success",
      data: allTasks,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).exec();
    res.status(200).json({
      status: "Success",
      data: task,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
    });
  }
};

const updateTask = (req, res) => {
  res.send("Update task");
};

const deleteTask = (req, res) => {
  res.send("Delete task");
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
