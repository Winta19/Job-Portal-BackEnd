const prisma = require("../prismaClient");

// Get all permission
const getPermissions = async (req, res) => {
  try {
    const permissions = await prisma.permission.findMany();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get permission by ID
const getPermissionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Use findUnique instead of findOne
    const permission = await prisma.permission.findUnique({
      where: { id: id },
    });

    if (!permission)
      return res.status(404).json({ error: "Permission not found" });

    res.json(permission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a permission
const createPermission = async (req, res) => {
  console.log(req.body);

  const { name } = req.body;

  // Ensure required fields are provided
  if (!name) {
    return res.status(400).json({ error: "name are required." });
  }

  try {
    const permission = await prisma.permission.create({
      data: {
        name,
      },
    });
    res.status(201).json(permission);
  } catch (error) {
    console.error("Error creating permission:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a permission
const updatePermission = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedPermission = await prisma.permission.update({
      where: { id: id },
      data: { name },
    });
    res.json(updatedPermission);
  } catch (error) {
    res.status(404).json({ error: "Permission not found" });
  }
};

// Delete a permission
const deletePermission = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.permission.delete({ where: { id: id } });
    res.json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Permission not found" });
  }
};

module.exports = {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
};
