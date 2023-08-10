const express = require("express");
const userDb = require("../models/userModels");

const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");

const registerAUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: "Please Enter All The Details" });
    }

    /*const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "socialmediavatars",
    });*/

    // Create the new user
    const newUser = await userDb.create({
      name,
      email,
      password,
      avatar: {
        public_id: "public-id",
        url: "public-url",
      },
      phone,
    });

    await newUser.save();
    const token = sendToken(newUser, 200, res);

    res.status(201).json({
      success: true,
      newUser,
      token,
      message: "User created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please Enter All The Details" });
    }

    const user = await userDb.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ error: "Invalid User" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = sendToken(user, 200, res);

    res.status(200).json({
      success: true,
      user,
      token,
      message: "User logged in",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userDb.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userDb.find();
    const usersCount = await userDb.countDocuments();

    res.status(200).json({
      success: true,
      users,
      usersCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await userDb.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User does not exist with Id: ${req.params.id}`,
      });
    }

    // Check if the user to be deleted is an admin
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "You cannot delete an admin account",
      });
    }

    await userDb.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerAUser,
  loginUser,
  logoutUser,
  getUserDetails,
  getAllUsers,
  deleteUser,
};
