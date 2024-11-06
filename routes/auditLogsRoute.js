const express = require('express');
const router = express.Router();
const auditLogsController = require('../controllers/auditLogsController');
const authorize = require('../middlewares/roleMiddleware'); // Import the middleware function correctly
const authenticate = require('../middlewares/authMiddleware').authenticate; // Import authenticate middleware correctly

// GET all audit logs
router.get('/', authenticate, authorize(['admin', 'loan_officer']), auditLogsController.getAuditLogs);

// GET single audit log by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), auditLogsController.getAuditLogById);

// POST create a new audit log
router.post('/', authenticate, authorize(['admin']), auditLogsController.createAuditLog);

module.exports = router;
