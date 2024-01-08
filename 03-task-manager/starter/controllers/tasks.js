const Task = require("../models/Task");
const express = require("express");
const asyncWrapper = require("../middleware/async");
const { createCustomAPIError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const allTasks = await Task.find({});
  res.status(200).json({
    status: "Success",
    data: allTasks,
  });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id).exec();
  if (!task) {
    return next(
      createCustomAPIError(`Can't find task with id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(task);
});

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    return next(
      createCustomAPIError(`Can't find task with id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "Success",
  });
});

const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.updateOne(
    { _id: req.params.id },
    { name: req.body.name },
    {
      new: true,
      runValidators: true,
    }
  );

  if (task.nModified === 0) {
    return next(
      createCustomAPIError(`Can't find task with id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "Success",
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
