const prisma = require("../prismaClient");

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include:{
        department:true, // Fetch department details
        location: true,
      },
    });
    res.json(jobs);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a job by ID
// 
const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include:{
        department:true, // Fetch department details
        location: true,
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Create a new job
const createJob = async (req, res) => {
  console.log(req.body,);

  const { title, description, departmentId,startDate,endDate,status,quantity,responsibility,requirement,skill ,locationId} = req.body;

  // Ensure required fields are provided
  if (!title || !description || !departmentId) {
    return res
      .status(400)
      .json({ error: " title, description and departmentId are required." });
  }

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        departmentId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),  
        status,   
        quantity:parseInt(quantity) ,
        responsibility,requirement,skill,locationId
      },
    });
    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a job
const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, departmentId, description } = req.body;
  try {
    const updatedJob = await prisma.job.update({
      where: { id: id },
      data: { title, departmentId, description },
    });
    res.json(updatedJob);
  } catch (error) {
    res.status(404).json({ error: "Job not found" });
  }
};

// Delete a user
const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    // await prisma.job.delete({ where: { id: id } });
    // res.json({ message: "Job deleted successfully" });
    await prisma.applicantForm.deleteMany({
      where: { jobId: id },
    });

    // Now delete the job
    await prisma.job.delete({
      where: { id },
    });

    res.json({ message: "Job deleted successfully" });
 
  } catch (error) {
    res.status(404).json({ error});
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob };
