const express = require('express');
const router = express.Router();
const insurancePoliciesController = require('../controllers/insurancePoliciesController');
const authorize = require('../middlewares/roleMiddleware');
const { authenticate } = require('../middlewares/authMiddleware');

// POST create a new insurance policy
router.post('/', authenticate, authorize(['admin', 'loan_officer']), insurancePoliciesController.createPolicy);

// GET all insurance policies
router.get('/', authenticate, authorize(['admin', 'loan_officer']), insurancePoliciesController.getAllPolicies);

// GET single insurance policy by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), insurancePoliciesController.getPolicyById);

// PUT update an insurance policy
router.put('/:id', authenticate, authorize(['admin', 'loan_officer']), insurancePoliciesController.updatePolicy);

// DELETE delete an insurance policy
router.delete('/:id', authenticate, authorize(['admin']), insurancePoliciesController.deletePolicy);

module.exports = router;
