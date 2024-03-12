const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const {
    body: { name, email, lastName, location },
    user: { userId },
  } = req;
  if (!name || !email || !lastName || !location) {
    throw new BadRequestError("Please provide all required values");
  }
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { name, email, lastName, location },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError(`No job with id ${userId}`);
  }

  const token = result.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      lastName: result.lastName,
      location: result.location,
      name: result.name,
      email: result.email,
      token,
    },
  });
};

module.exports = {
  register,
  login,
  updateUser,
};
