const express = require("express");

const getAllTasks = (req, res) => {
  res.send("All tasks");
};

const createTask = (req, res) => {
  res.status(200).json(req.body);
};

const getTask = (req, res) => {
  res.send("Get task");
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
