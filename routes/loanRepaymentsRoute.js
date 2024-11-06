const express = require('express');
const router = express.Router();
const loanRepaymentsController = require('../controllers/loanRepaymentsController');
const authorize = require('../middlewares/roleMiddleware');
const { authenticate } = require('../middlewares/authMiddleware'); // Destructure if exported as an object

// POST create a new loan repayment
router.post('/', authenticate, authorize(['admin', 'loan_officer']), loanRepaymentsController.createRepayment);

// GET all loan repayments
router.get('/', authenticate, authorize(['admin', 'loan_officer']), loanRepaymentsController.getAllRepayments);

// GET single loan repayment by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), loanRepaymentsController.getRepaymentById);

// PUT update a loan repayment
router.put('/:id', authenticate, authorize(['admin', 'loan_officer']), loanRepaymentsController.updateRepayment);

// DELETE delete a loan repayment
router.delete('/:id', authenticate, authorize(['admin']), loanRepaymentsController.deleteRepayment);

module.exports = router;
