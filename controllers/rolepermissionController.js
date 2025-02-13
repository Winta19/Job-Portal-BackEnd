const prisma = require("../prismaClient");

// Get all RolePermissions
const getRolePermissions = async (req, res) => {
  try {
    const RolePermissions = await prisma.RolePermission.findMany();
    res.json(RolePermissions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a RolePermission by ID
const getRolePermissionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Use findUnique instead of findOne
    const RolePermission = await prisma.RolePermission.findUnique({
      where: { id: id },
    });

    if (!RolePermission)
      return res.status(404).json({ error: " RolePermission not found" });

    res.json(RolePermission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new RolePermission
const createRolePermission = async (req, res) => {
  console.log(req.body);

  const { roleId, permissionId } = req.body;

  // Ensure required fields are provided
  if (!roleId || !permissionId) {
    return res
      .status(400)
      .json({ error: "Fname, Lname, and roleId are required." });
  }

  try {
    const RolePermission = await prisma.RolePermission.create({
      data: {
        roleId,
        permissionId,
      },
    });
    res.status(201).json(RolePermission);
  } catch (error) {
    console.error("Error creating RolePermission:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a RolePermission
const updateRolePermission = async (req, res) => {
  const { id } = req.params;
  const { roleId, permissionId } = req.body;
  try {
    const updatedRolePermission = await prisma.RolePermission.update({
      where: { id: id },
      data: { roleId, permissionId },
    });
    res.json(updatedRolePermission);
  } catch (error) {
    res.status(404).json({ error: " RolePermission not found" });
  }
};

// Delete a RolePermission
const deleteRolePermission = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id, "first");
    await prisma.rolePermission.delete({ where: { id: id } });
    res.json({ message: " RolePermission deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: " RolePermission not found" });
  }
};

module.exports = {
  getRolePermissions,
  getRolePermissionById,
  createRolePermission,
  updateRolePermission,
  deleteRolePermission,
};
