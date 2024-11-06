const ProgramEnrollment = require('../models/programEnrollmentModel');

// Create a new enrollment
exports.createEnrollment = async (req, res) => {
  try {
    const enrollment = await ProgramEnrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await ProgramEnrollment.findAll();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await ProgramEnrollment.findByPk(req.params.id);
    if (enrollment) {
      res.status(200).json(enrollment);
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an enrollment by ID
exports.updateEnrollment = async (req, res) => {
  try {
    const [updated] = await ProgramEnrollment.update(req.body, {
      where: { enrollment_id: req.params.id }
    });
    if (updated) {
      const updatedEnrollment = await ProgramEnrollment.findByPk(req.params.id);
      res.status(200).json(updatedEnrollment);
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an enrollment by ID
exports.deleteEnrollment = async (req, res) => {
  try {
    const deleted = await ProgramEnrollment.destroy({
      where: { enrollment_id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Enrollment successfully deleted' });
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
