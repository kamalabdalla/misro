const express = require('express');
const router = express.Router();
const programEnrollmentController = require('../controllers/programEnrollmentController');
const authorize = require('../middlewares/roleMiddleware'); // Correct import
const { authenticate } = require('../middlewares/authMiddleware'); // Destructure if exported as an object

// POST create a new program enrollment
router.post('/', authenticate, authorize(['admin', 'loan_officer']), programEnrollmentController.createEnrollment);

// GET all program enrollments
router.get('/', authenticate, authorize(['admin', 'loan_officer']), programEnrollmentController.getAllEnrollments);

// GET single program enrollment by ID
router.get('/:id', authenticate, authorize(['admin', 'loan_officer']), programEnrollmentController.getEnrollmentById);

// PUT update a program enrollment
router.put('/:id', authenticate, authorize(['admin', 'loan_officer']), programEnrollmentController.updateEnrollment);

// DELETE delete a program enrollment
router.delete('/:id', authenticate, authorize(['admin']), programEnrollmentController.deleteEnrollment);

module.exports = router;
