const InsuranceClaim = require('../models/insuranceClaimsModel');

// Create an insurance claim
exports.createClaim = async (req, res) => {
  try {
    const { policy_id, claim_amount, claim_date, claim_status } = req.body;
    const claim = await InsuranceClaim.create({
      policy_id,
      claim_amount,
      claim_date,
      claim_status,
    });
    res.status(201).json(claim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all insurance claims
exports.getAllClaims = async (req, res) => {
  try {
    const claims = await InsuranceClaim.findAll();
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single insurance claim by ID
exports.getClaimById = async (req, res) => {
  try {
    const claim = await InsuranceClaim.findByPk(req.params.id);
    if (claim) {
      res.status(200).json(claim);
    } else {
      res.status(404).json({ message: 'Claim not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an insurance claim by ID
exports.updateClaim = async (req, res) => {
  try {
    const { claim_amount, claim_date, claim_status } = req.body;
    const [updated] = await InsuranceClaim.update(
      {
        claim_amount,
        claim_date,
        claim_status,
      },
      {
        where: { claim_id: req.params.id },
      }
    );
    if (updated) {
      const updatedClaim = await InsuranceClaim.findByPk(req.params.id);
      res.status(200).json(updatedClaim);
    } else {
      res.status(404).json({ message: 'Claim not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an insurance claim by ID
exports.deleteClaim = async (req, res) => {
  try {
    const deleted = await InsuranceClaim.destroy({
      where: { claim_id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Claim not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
