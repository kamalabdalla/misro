// src/controllers/auditLogsController.js

const AuditLog = require('../models/auditLogsModel');

const getAuditLogs = async (req, res) => {
  try {
    const auditLogs = await AuditLog.findAll();
    res.json(auditLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAuditLogById = async (req, res) => {
  const { id } = req.params;
  try {
    const auditLog = await AuditLog.findByPk(id);
    if (!auditLog) {
      return res.status(404).json({ message: `Audit log with ID ${id} not found` });
    }
    res.json(auditLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAuditLog = async (req, res) => {
  const { user_id, action, details } = req.body;
  try {
    const auditLog = await AuditLog.create({ user_id, action, details });
    res.status(201).json(auditLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAuditLogs,
  getAuditLogById,
  createAuditLog,
};
