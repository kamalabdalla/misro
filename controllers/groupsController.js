// src/controllers/groupsController.js
const Group = require('../models/groupsModel');

// GET all groups
const getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single group by ID
const getGroupById = async (req, res) => {
  const groupId = req.params.id;

  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: `Group with ID ${groupId} not found` });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new group
const createGroup = async (req, res) => {
  const { group_name, formation_date, status } = req.body;

  try {
    const newGroup = await Group.create({
      group_name,
      formation_date,
      status
    });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a group
const updateGroup = async (req, res) => {
  const groupId = req.params.id;
  const { group_name, formation_date, status } = req.body;

  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: `Group with ID ${groupId} not found` });
    }

    group.group_name = group_name;
    group.formation_date = formation_date;
    group.status = status;

    await group.save();
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a group
const deleteGroup = async (req, res) => {
  const groupId = req.params.id;

  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: `Group with ID ${groupId} not found` });
    }

    await group.destroy();
    res.json({ message: `Group with ID ${groupId} has been deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup
};
