const prisma = require("../prismaClient");

//Get all the departments
const getDepartment = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Erorr" });
  }
};

//Get department by ID
const getDepartmentById = async (req, res) => {
  const { id } = req.params;

  // Use findUnique instead of findOne
  try {
    const department = await prisma.department.findOne({
      where: { id: id },
    });
    if (!department)
      return res.status(404).json({ erorr: "department not found" });

    res.json(department);
  } catch (erorr) {
    console.log(erorr);
    res.status(500).json({ erorr: "Internal Server Erorr" });
  }
};

//create new department
const createDepartment = async (req, res) => {
  console.log(req.body);

  const { name, abbreviation } = req.body;

  // Ensure required fields are provided
  if (!name || !abbreviation) {
    return res.status(400).json({ error: "name & abbreviation are required" });
  }
  try {
    const department = await prisma.department.create({
      data: {
        name,
        abbreviation,
      },
    });
    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update department
const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, abbreviation } = req.body;
  try {
    const updatedDepartment = await prisma.department.update({
      where: { id: id },
      data: { name, abbreviation },
    });
    res.json(updatedDepartment);
  } catch (error) {
    res.status(404).json({ error: "department not found" });
  }
};

//Delete department

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.department.delete({ where: { id: id } });
    res.json({ message: " Department deleted successfully " });
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};
module.exports = {
  getDepartment,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
