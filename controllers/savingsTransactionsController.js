const SavingsTransaction = require('../models/savingsTransactionsModel');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const transaction = await SavingsTransaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await SavingsTransaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await SavingsTransaction.findByPk(req.params.id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a transaction by ID
exports.updateTransaction = async (req, res) => {
  try {
    const [updated] = await SavingsTransaction.update(req.body, {
      where: { transaction_id: req.params.id },
    });
    if (updated) {
      const updatedTransaction = await SavingsTransaction.findByPk(req.params.id);
      res.status(200).json(updatedTransaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
  try {
    const deleted = await SavingsTransaction.destroy({
      where: { transaction_id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Transaction successfully deleted' });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
