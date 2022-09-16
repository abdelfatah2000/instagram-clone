const { User } = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already use" });
    } else {
      const userData = new User({
        name,
        email,
        password,
      });
      userData.save();
      res.status(StatusCodes.CREATED).json({ message: "User is Added" });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Error, please try again", error });
  }
};

const login = async (req, res) => {
  try {
    const payload = req.body;
    const user = await User.findOne({ email: payload.email });
    if (user) {
      const match = await bcrypt.compare(payload.password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SCERETKEY
        );
        res
          .status(StatusCodes.ACCEPTED)
          .json({ message: "Login Successfuly", token });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid email or password" });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Error, please try", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const payload = req.body;
    await User.findByIdAndUpdate({ _id: req.params.id }, payload, {
      new: true,
    });
    res.status(StatusCodes.BAD_REQUEST).json({ message: "User is Updated" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Error, please try" });
  }
};

module.exports = {
  register,
  login,
  updateUser,
};
