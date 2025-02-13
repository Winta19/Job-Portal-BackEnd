const prisma = require("../prismaClient");

// Get all ApplicantForms
const getApplicantForms = async (req, res) => {
  try {
    const ApplicantForms = await prisma.ApplicantForm.findMany();
    res.json(ApplicantForms);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a ApplicantForm by ID
const getApplicantFormById = async (req, res) => {
  const { id } = req.params;

  try {
    // Use findUnique instead of findOne
    const ApplicantForm = await prisma.applicantForm.findUnique({
      where: { id: id },
    });

    if (!ApplicantForm)
      return res.status(404).json({ error: " ApplicantForm not found" });

    res.json(ApplicantForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new ApplicantForm
const createApplicantForm = async (req, res) => {
  console.log()
  console.log(req.body,"bodyData")

  const { FullName, email, cgpa, phone,status,jobId} = req.body;
  const cvPath = req.file ? req.file.path : null; // Get uploaded file path
  //const cvPath = req.files['cv'][0]
console.log("cvPath",cvPath);

  if (!FullName || !email) {
    return res.status(400).json({ error: "Full name and email are required." });
  }

  try {
    const applicantForm = await prisma.applicantForm.create({
      data: {
        fullName: FullName,
        cgpa: parseFloat(cgpa),
        email,
        phone,
        cv: cvPath, // Save file path in database
        status: status,
        jobId,
      },
    });
    res.status(201).json(applicantForm);
  } catch (error) {
    console.error("Error creating ApplicantForm:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Update a ApplicantForm
const updateApplicantForm = async (req, res) => {
  const { id } = req.params;
  const { fullName, email } = req.body;
  try {
    const updatedApplicantForm = await prisma.applicantForm.update({
      where: { id: id },
      data: { fullName, email },
    });
    res.json(updatedApplicantForm);
  } catch (error) {
    res.status(404).json({ error: " ApplicantForm not found" });
  }
};

// Update a ApplicantForm
const updateStatusApplicantForm = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedApplicantForm = await prisma.applicantForm.update({
      where: { id: id },
      data: {  status },
    });
    res.json(updatedApplicantForm);
  } catch (error) {
    res.status(404).json({ error: " ApplicantForm not found" });
  }
};

// Delete a ApplicantForm
const deleteApplicantForm = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.ApplicantForm.delete({ where: { id: id } });
    res.json({ message: " ApplicantForm deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: " ApplicantForm not found" });
  }
};

module.exports = {
  getApplicantForms,
  getApplicantFormById,
  createApplicantForm,
  updateApplicantForm,
  deleteApplicantForm,
  updateStatusApplicantForm
};
