const express = require('express');
const router = express.Router();
const groupMemberController = require('../controllers/groupMemberController');
const authorize = require('../middlewares/roleMiddleware');
const authenticate = require('../middlewares/authMiddleware').authenticate;

// GET all group members
router.get('/', authenticate, authorize(['admin', 'loan_officer']), groupMemberController.getGroupMembers);

// GET single group member by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), groupMemberController.getGroupMemberById);

// POST create a new group member
router.post('/', authenticate, authorize(['admin', 'loan_officer']), groupMemberController.createGroupMember);

// PUT update a group member
router.put('/:id', authenticate, authorize(['admin', 'loan_officer']), groupMemberController.updateGroupMember);

// DELETE delete a group member
router.delete('/:id', authenticate, authorize(['admin']), groupMemberController.deleteGroupMember);

module.exports = router;
