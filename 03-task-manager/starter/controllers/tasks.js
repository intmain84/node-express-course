const Task = require("../models/Task");
const express = require("express");

const getAllTasks = async (req, res) => {
  res.send("All tasks");
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json(task);
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
