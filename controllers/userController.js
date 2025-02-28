const prisma = require("../prismaClient");
const jwt = require('jsonwebtoken');
// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Use findUnique instead of findOne
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const createUser = asyncHandler(async (req, res) => {
//   try {
//     const password1 = req.body.password
//     console.log(password1);
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password1, 10)
// //     console.log(hash);
// //      const isMatch = await bcrypt.compare(password1,hash)
// //  console.log(isMatch);
//     let {email, password, firstName, lastName, gender, department, tel,} = req.body;
//     console.log(password);
// /**@check if User Email exists*/
// const isExist = await prisma.users.findUnique( {
//   where: {
//   email: email,
// }})

// // const salt = await bcrypt.genSalt(10)
// // const hash = await bcrypt.hash(password, salt)

// console.log(isExist);
//     if(isExist){
//         res.status(409).json({
//     success:false,
//     message:"User already exist"
//   })
//     }else{

//     const user = await prisma.users.create({
//       data: {
//         firstName:firstName,
//         lastName:lastName,
//         email: email,
//         gender:gender,
//         department:department,
//         tel:tel,
//         password: hash,
//         // created_by: req.authUser.id,
//         created_at:new Date()
//       },
//     });

// console.log(user);
//     if (user) {
//       return res.status(201).json({
//         success: true,
//         status: 201,
//         message: "User created successfully!!!",
//         data: user,
//       });
//     }
//   }
//   } catch (error) {
//     res.status(400).json({
//       error: error,
//       message: error.code,
//     });
//   }
// });

// Create a new user
const bcrypt = require("bcrypt"); //import bcrypt
const createUser = async (req, res) => {
  console.log(req.body);
  const password1 = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password1, salt);

  console.log(hashedPassword, "hashedPassword");

  const { Fname, Lname, password, email, image, role, departmentId } =
    req.body;

  // Ensure required fields are provided
  if (!Fname || !Lname || !password || !role) {
    return res
      .status(400)
      .json({ error: "Fname, Lname,roleId and password are required." });
  }

  try {
    const user = await prisma.user.create({
      data: {
        Fname,
        Lname,
        password: hashedPassword,
        email, // Optional field
        image, // Optional field
        role, // Required field
        departmentId, // Optional field
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const changePassword = async (req, res) => {
  const { id } = req.params; // Get userId from params
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Both current and new passwords are required." });
  }

  try {
    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect." });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in the database
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { Fname, Lname, email, image, role, departmentId } =
    req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id:id },
      data: {
        Fname,
        Lname,
        email, // Optional field
        image, // Optional field
        role, // Required field
        // departmentId, // Optional field
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {

//     const user = await prisma.user.findUnique({ where: { id: id } });
// if(!user ){
//   res.status(404).json({ error: "User not found" });

// }
    await prisma.user.delete({ where: { id} });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ error});
  }
};

const loginUser =  async (req,res)=>{
  const {email,password } = req.body;
  // steps 
  // 1. check if the email exists 
  // 2. if 1 is true, compare the hashed password with the stored password 
  // if 2 is true, return a token , else authentication 
  try {
    let emailExists = await prisma.user.findFirst({
      where: {
        email:email,
      },
    });
    console.log("emailExists");
    console.log(emailExists);
    
    if(emailExists){
      // 
      const match = await bcrypt.compare(password, emailExists.password);
      if(match){
        let jwtToken = await jwt.sign({
          data: {
            id:emailExists.id,
            role:'admin'
          }
        }, 'secret', { expiresIn: '1h' });
        res.status(200).json({
           message: "logged in successfully",
           token:jwtToken,
           id:emailExists.id,
           name:emailExists.Fname +' '+ emailExists.Lname,
           role:emailExists.role
           });
      }else{
        res.status(404).json({ error: "Authentication Error" });
      }
    }else{
      res.status(404).json({ error: "Authentication Error" });
    }

    
  } catch (error) {
    console.log('[catch] ');
    console.log(error);
    
    
    res.status(404).json({ error: "Authentication Error" });
  }
}

module.exports = { getUsers,changePassword, getUserById, createUser, updateUser, deleteUser ,loginUser};
