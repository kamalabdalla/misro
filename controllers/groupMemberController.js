// src/controllers/groupMemberController.js

const GroupMember = require('../models/groupMemberModel');

const getGroupMembers = async (req, res) => {
  try {
    const groupMembers = await GroupMember.findAll();
    res.json(groupMembers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGroupMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const groupMember = await GroupMember.findByPk(id);
    if (!groupMember) {
      return res.status(404).json({ message: `Group member with ID ${id} not found` });
    }
    res.json(groupMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGroupMember = async (req, res) => {
  const { group_id, user_id, join_date, status } = req.body;
  try {
    const groupMember = await GroupMember.create({ group_id, user_id, join_date, status });
    res.status(201).json(groupMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGroupMember = async (req, res) => {
  const { id } = req.params;
  const { group_id, user_id, join_date, status } = req.body;
  try {
    const groupMember = await GroupMember.findByPk(id);
    if (!groupMember) {
      return res.status(404).json({ message: `Group member with ID ${id} not found` });
    }
    groupMember.group_id = group_id;
    groupMember.user_id = user_id;
    groupMember.join_date = join_date;
    groupMember.status = status;
    await groupMember.save();
    res.json(groupMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGroupMember = async (req, res) => {
  const { id } = req.params;
  try {
    const groupMember = await GroupMember.findByPk(id);
    if (!groupMember) {
      return res.status(404).json({ message: `Group member with ID ${id} not found` });
    }
    await groupMember.destroy();
    res.json({ message: 'Group member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGroupMembers,
  getGroupMemberById,
  createGroupMember,
  updateGroupMember,
  deleteGroupMember,
};
