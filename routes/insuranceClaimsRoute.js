const express = require('express');
const router = express.Router();
const insuranceClaimsController = require('../controllers/insuranceClaimsController');
const authorize = require('../middlewares/roleMiddleware');
const { authenticate } = require('../middlewares/authMiddleware');

// POST create a new insurance claim
router.post('/', authenticate, authorize(['admin', 'loan_officer']), insuranceClaimsController.createClaim);

// GET all insurance claims
router.get('/', authenticate, authorize(['admin', 'loan_officer']), insuranceClaimsController.getAllClaims);

// GET single insurance claim by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), insuranceClaimsController.getClaimById);

// PUT update an insurance claim
router.put('/:id', authenticate, authorize(['admin', 'loan_officer']), insuranceClaimsController.updateClaim);

// DELETE delete an insurance claim
router.delete('/:id', authenticate, authorize(['admin']), insuranceClaimsController.deleteClaim);

module.exports = router;
