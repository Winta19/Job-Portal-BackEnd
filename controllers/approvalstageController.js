const prisma = require("../prismaClient");

// Get all ApprovalStages
const getApprovalStage = async (req, res) => {
  try {
    const ApprovalStages = await prisma.ApprovalStage.findMany();
    res.json(ApprovalStages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a ApprovalStage by ID
const getApprovalStageById = async (req, res) => {
  const { id } = req.params;

  try {
    // Use findUnique instead of findOne
    const ApprovalStage = await prisma.ApprovalStage.findUnique({
      where: { id: id },
    });

    if (!ApprovalStage)
      return res.status(404).json({ error: "ApprovalStage not found" });

    res.json(ApprovalStage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create an ApprovalStage
const createApprovalStage = async (req, res) => {
  console.log(req.body);

  const { name, stage } = req.body;

  // Ensure required fields are provided
  if (!name || !stage) {
    return res.status(400).json({ error: " name and stage are required." });
  }

  try {
    const ApprovalStage = await prisma.ApprovalStage.create({
      data: {
        name,
        stage,
      },
    });
    res.status(201).json(ApprovalStage);
  } catch (error) {
    console.error("Error creating ApprovalStage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a ApprovalStage
const updateApprovalStage = async (req, res) => {
  const { id } = req.params;
  const { name, stage } = req.body;
  try {
    const updatedApprovalStage = await prisma.ApprovalStage.update({
      where: { id: id },
      data: { name, stage },
    });
    res.json(updatedApprovalStage);
  } catch (error) {
    res.status(404).json({ error: "ApprovalStage not found" });
  }
};

// Delete a ApprovalStage
const deleteApprovalStage = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.ApprovalStage.delete({ where: { id: id } });
    res.json({ message: "ApprovalStage deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "ApprovalStage not found" });
  }
};

module.exports = {
  getApprovalStage,
  getApprovalStageById,
  createApprovalStage,
  updateApprovalStage,
  deleteApprovalStage,
};
