const InsurancePolicy = require('../models/insurancePoliciesModel');

// Create an insurance policy
exports.createPolicy = async (req, res) => {
  try {
    console.log('Create Policy Request Body:', req.body); // Logging request body
    const {
      user_id, policy_type, coverage_amount, premium_amount, 
      premium_frequency, start_date, end_date, status
    } = req.body;
    const policy = await InsurancePolicy.create({
      user_id,
      policy_type,
      coverage_amount,
      premium_amount,
      premium_frequency,
      start_date,
      end_date,
      status,
    });
    res.status(201).json(policy);
  } catch (error) {
    console.error('Create Policy Error:', error); // Logging error
    res.status(400).json({ error: error.message });
  }
};

// Get all insurance policies
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await InsurancePolicy.findAll();
    res.status(200).json(policies);
  } catch (error) {
    console.error('Get All Policies Error:', error); // Logging error
    res.status(500).json({ error: error.message });
  }
};

// Get a single insurance policy by ID
exports.getPolicyById = async (req, res) => {
  try {
    const policy = await InsurancePolicy.findByPk(req.params.id);
    if (policy) {
      res.status(200).json(policy);
    } else {
      res.status(404).json({ message: 'Policy not found' });
    }
  } catch (error) {
    console.error('Get Policy By ID Error:', error); // Logging error
    res.status(500).json({ error: error.message });
  }
};

// Update an insurance policy by ID
exports.updatePolicy = async (req, res) => {
  try {
    console.log('Update Policy Request Body:', req.body); // Logging request body
    const {
      user_id, policy_type, coverage_amount, premium_amount, 
      premium_frequency, start_date, end_date, status
    } = req.body;
    const [updated] = await InsurancePolicy.update(
      {
        user_id,
        policy_type,
        coverage_amount,
        premium_amount,
        premium_frequency,
        start_date,
        end_date,
        status,
      },
      {
        where: { policy_id: req.params.id },
      }
    );
    if (updated) {
      const updatedPolicy = await InsurancePolicy.findByPk(req.params.id);
      res.status(200).json(updatedPolicy);
    } else {
      res.status(404).json({ message: 'Policy not found' });
    }
  } catch (error) {
    console.error('Update Policy Error:', error); // Logging error
    res.status(400).json({ error: error.message });
  }
};

// Delete an insurance policy by ID
exports.deletePolicy = async (req, res) => {
  try {
    const deleted = await InsurancePolicy.destroy({
      where: { policy_id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Policy not found' });
    }
  } catch (error) {
    console.error('Delete Policy Error:', error); // Logging error
    res.status(500).json({ error: error.message });
  }
};
