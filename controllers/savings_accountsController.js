// src/controllers/savingsAccountsController.js

const SavingsAccount = require('../models/savings_accountsModel');

const getSavingsAccounts = async (req, res) => {
  try {
    const savingsAccounts = await SavingsAccount.findAll();
    res.json(savingsAccounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSavingsAccountById = async (req, res) => {
  const accountId = req.params.id;

  try {
    const savingsAccount = await SavingsAccount.findByPk(accountId);
    if (!savingsAccount) {
      return res.status(404).json({ message: `Savings Account with ID ${accountId} not found` });
    }
    res.json(savingsAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSavingsAccount = async (req, res) => {
  const { user_id, account_balance, interest_rate, status } = req.body;

  try {
    const newSavingsAccount = await SavingsAccount.create({
      user_id,
      account_balance,
      interest_rate,
      status
    });
    res.status(201).json(newSavingsAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSavingsAccount = async (req, res) => {
  const accountId = req.params.id;
  const { user_id, account_balance, interest_rate, status } = req.body;

  try {
    let savingsAccount = await SavingsAccount.findByPk(accountId);
    if (!savingsAccount) {
      return res.status(404).json({ message: `Savings Account with ID ${accountId} not found` });
    }

    savingsAccount.user_id = user_id;
    savingsAccount.account_balance = account_balance;
    savingsAccount.interest_rate = interest_rate;
    savingsAccount.status = status;

    await savingsAccount.save();
    res.json(savingsAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSavingsAccount = async (req, res) => {
  const accountId = req.params.id;

  try {
    const savingsAccount = await SavingsAccount.findByPk(accountId);
    if (!savingsAccount) {
      return res.status(404).json({ message: `Savings Account with ID ${accountId} not found` });
    }

    await savingsAccount.destroy();
    res.json({ message: `Savings Account with ID ${accountId} has been deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export controller methods
module.exports = {
  getSavingsAccounts,
  getSavingsAccountById,
  createSavingsAccount,
  updateSavingsAccount,
  deleteSavingsAccount
};
