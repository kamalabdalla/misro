// src/routes/savings_accountsRoute.js
const express = require('express');
const router = express.Router();
const savingsAccountsController = require('../controllers/savings_accountsController');
const authorize = require('../middlewares/roleMiddleware');
const { authenticate } = require('../middlewares/authMiddleware');

// GET all savings accounts
router.get('/', authenticate, authorize(['admin', 'loan_officer']), savingsAccountsController.getSavingsAccounts);

// GET single savings account by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), savingsAccountsController.getSavingsAccountById);

// POST create a new savings account
router.post('/', authenticate, authorize(['admin', 'loan_officer']), savingsAccountsController.createSavingsAccount);

// PUT update a savings account
router.put('/:id', authenticate, authorize(['admin', 'loan_officer']), savingsAccountsController.updateSavingsAccount);

// DELETE delete a savings account
router.delete('/:id', authenticate, authorize(['admin']), savingsAccountsController.deleteSavingsAccount);

module.exports = router;
