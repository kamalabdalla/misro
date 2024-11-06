const FinancialEducationProgram = require('../models/financialEducationModel');

const getFinancialEducationPrograms = async (req, res) => {
  try {
    const programs = await FinancialEducationProgram.findAll();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFinancialEducationProgramById = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await FinancialEducationProgram.findByPk(id);
    if (!program) {
      return res.status(404).json({ message: `Program with ID ${id} not found` });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFinancialEducationProgram = async (req, res) => {
  const { program_name, description, start_date, end_date, status } = req.body;
  try {
    const program = await FinancialEducationProgram.create({
      program_name,
      description,
      start_date,
      end_date,
      status
    });
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFinancialEducationProgram = async (req, res) => {
  const { id } = req.params;
  const { program_name, description, start_date, end_date, status } = req.body;
  try {
    const program = await FinancialEducationProgram.findByPk(id);
    if (!program) {
      return res.status(404).json({ message: `Program with ID ${id} not found` });
    }
    program.program_name = program_name;
    program.description = description;
    program.start_date = start_date;
    program.end_date = end_date;
    program.status = status;
    await program.save();
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFinancialEducationProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await FinancialEducationProgram.findByPk(id);
    if (!program) {
      return res.status(404).json({ message: `Program with ID ${id} not found` });
    }
    await program.destroy();
    res.json({ message: `Program with ID ${id} has been deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFinancialEducationPrograms,
  getFinancialEducationProgramById,
  createFinancialEducationProgram,
  updateFinancialEducationProgram,
  deleteFinancialEducationProgram,
};
