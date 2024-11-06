const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');
const authorize = require('../middlewares/roleMiddleware'); // Correct import
const { authenticate } = require('../middlewares/authMiddleware'); // Destructure if exported as an object

// POST create a new loan
router.post('/', authenticate, authorize(['admin', 'loan_officer']), loansController.createLoan);

// GET all loans
router.get('/', authenticate, authorize(['admin', 'loan_officer']), loansController.getAllLoans);

// GET single loan by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), loansController.getLoanById);

// PUT update a loan
router.put('/:id', authenticate, authorize(['admin', 'loan_officer']), loansController.updateLoan);

// DELETE delete a loan
router.delete('/:id', authenticate, authorize(['admin']), loansController.deleteLoan);

module.exports = router;
