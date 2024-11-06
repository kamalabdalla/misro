const express = require('express');
const router = express.Router();
const savingsTransactionsController = require('../controllers/savingsTransactionsController');
const { authenticate } = require('../middlewares/authMiddleware'); // Destructure if exported as an object
const authorize = require('../middlewares/roleMiddleware');

// POST create a new savings transaction
router.post('/', authenticate, authorize(['admin', 'loan_officer']), savingsTransactionsController.createTransaction);

// GET all savings transactions
router.get('/', authenticate, authorize(['admin', 'loan_officer']), savingsTransactionsController.getAllTransactions);

// GET single savings transaction by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), savingsTransactionsController.getTransactionById);

// PUT update a savings transaction
router.put('/:id', authenticate, authorize(['admin', 'loan_officer']), savingsTransactionsController.updateTransaction);

// DELETE delete a savings transaction
router.delete('/:id', authenticate, authorize(['admin']), savingsTransactionsController.deleteTransaction);

module.exports = router;
