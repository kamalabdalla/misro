const LoanRepayment = require('../models/loanRepaymentsModel');

// Create a new loan repayment
exports.createRepayment = async (req, res) => {
  try {
    const newRepayment = await LoanRepayment.create(req.body);
    res.status(201).json(newRepayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all loan repayments
exports.getAllRepayments = async (req, res) => {
  try {
    const repayments = await LoanRepayment.findAll();
    res.status(200).json(repayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single loan repayment by ID
exports.getRepaymentById = async (req, res) => {
  try {
    const repayment = await LoanRepayment.findByPk(req.params.id);
    if (repayment) {
      res.status(200).json(repayment);
    } else {
      res.status(404).json({ message: 'Repayment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a loan repayment by ID
exports.updateRepayment = async (req, res) => {
  try {
    const [updated] = await LoanRepayment.update(req.body, {
      where: { repayment_id: req.params.id },
    });
    if (updated) {
      const updatedRepayment = await LoanRepayment.findByPk(req.params.id);
      res.status(200).json(updatedRepayment);
    } else {
      res.status(404).json({ message: 'Repayment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a loan repayment by ID
exports.deleteRepayment = async (req, res) => {
  try {
    const deleted = await LoanRepayment.destroy({
      where: { repayment_id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Repayment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Repayment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
