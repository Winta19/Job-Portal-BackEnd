const prisma = require("../prismaClient");

//Get all the roles
const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get role ById

const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    // Use findUnique instead of findOne
    const role = await prisma.role.findUnique({ where: { id: id } });
    if (!role) return res.status(404).json({ error: " Role not found " });

    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " Internal Server Error " });
  }
};

// Create a new role
const createRole = async (req, res) => {
  console.log(req.body);

  const { name } = req.body;
  // Ensure required fields are provided
  if (!name) {
    return res.status(400).json({ error: "name are required" });
  }
  try {
    const role = await prisma.role.create({
      data: {
        name,
      },
    });
    res.status(201).json(role);
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a role
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedRole = await prisma.role.update({
      where: { id: id },
      data: { name },
    });
    res.json(updatedRole);
  } catch (error) {
    res.status(404).json({ error: "Role not found" });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.role.delete({ where: { id: id } });
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Role not found" });
  }
};

module.exports = { getRoles, getRoleById, createRole, updateRole, deleteRole };
