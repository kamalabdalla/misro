const Loan = require('../models/loansModel');

// Create a new loan
exports.createLoan = async (req, res) => {
  try {
    const newLoan = await Loan.create(req.body);
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single loan by ID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (loan) {
      res.status(200).json(loan);
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a loan by ID
exports.updateLoan = async (req, res) => {
  try {
    const [updated] = await Loan.update(req.body, {
      where: { loan_id: req.params.id },
    });
    if (updated) {
      const updatedLoan = await Loan.findByPk(req.params.id);
      res.status(200).json(updatedLoan);
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a loan by ID
exports.deleteLoan = async (req, res) => {
  try {
    const deleted = await Loan.destroy({
      where: { loan_id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Loan deleted successfully' });
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
