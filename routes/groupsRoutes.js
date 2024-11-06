const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groupsController'); // Ensure this path is correct
const authorize = require('../middlewares/roleMiddleware');
const { authenticate } = require('../middlewares/authMiddleware'); // Corrected import

// GET all groups
router.get('/', authenticate, authorize(['admin', 'loan_officer']), groupsController.getGroups);

// GET single group by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), groupsController.getGroupById);

// POST create a new group
router.post('/', authenticate, authorize(['admin', 'loan_officer']), groupsController.createGroup);

// PUT update a group
router.put('/:id', authenticate, authorize(['admin', 'loan_officer']), groupsController.updateGroup);

// DELETE delete a group
router.delete('/:id', authenticate, authorize(['admin']), groupsController.deleteGroup);

module.exports = router;
