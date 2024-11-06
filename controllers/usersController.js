// src/controllers/usersController.js
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { u_name, email, phone, address, date_of_birth, gender, role, status, password } = req.body;
  try {
    // Hash the password before creating the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      u_name,
      email,
      phone,
      address,
      date_of_birth,
      gender,
      role,
      status,
      password: hashedPassword // Save the hashed password
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { u_name, email, phone, address, date_of_birth, gender, role, status } = req.body;
  try {
    let user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }

    user.u_name = u_name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.date_of_birth = date_of_birth;
    user.gender = gender;
    user.role = role;
    user.status = status;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }

    await user.destroy();
    res.json({ message: `User with ID ${userId} has been deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
