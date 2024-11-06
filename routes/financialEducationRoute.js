const express = require('express');
const router = express.Router();
const financialEducationController = require('../controllers/financialEducationController');
const { authenticate } = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

// GET all financial education programs
router.get('/', authenticate, authorize(['admin', 'loan_officer']), financialEducationController.getFinancialEducationPrograms);

// GET single financial education program by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), financialEducationController.getFinancialEducationProgramById);

// POST create a new financial education program
router.post('/', authenticate, authorize(['admin']), financialEducationController.createFinancialEducationProgram);

// PUT update a financial education program
router.put('/:id', authenticate, authorize(['admin']), financialEducationController.updateFinancialEducationProgram);

// DELETE a financial education program
router.delete('/:id', authenticate, authorize(['admin']), financialEducationController.deleteFinancialEducationProgram);

module.exports = router;
