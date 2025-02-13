const express = require("express");
const userRoute = require("./routes/userRoute"); // Correct import of userRoute
const departmentRoute = require("./routes/departmentRoute"); // Correct import of departmentRoute
const roleRoute = require("./routes/roleRoute"); // Correct import of roleRoute
const permissionRoute = require("./routes/permissionRoute"); // Correct import of permissionRoute
const jobRoute = require("./routes/jobRoute"); // Correct import of jobRoute
const approvalstageRoute = require("./routes/approvalstageRoute"); // Correct import of ApprovalStageRoutes
const rolepermissionRoute = require("./routes/rolepermissionRoute"); // Correct import of RolePermissions;
const ApplicantFormRoute = require("./routes/ApplicantFormRoute"); // Correct import of ApplicantFormRoutes;
const locationRoute = require("./routes/locationRoute")
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
// Use userRoutes
app.use("/users", userRoute);
app.use("/departments", departmentRoute);
app.use("/roles", roleRoute);
app.use("/permissions", permissionRoute);
app.use("/jobs", jobRoute);
app.use("/location",locationRoute);
app.use("/approvalstages", approvalstageRoute);
app.use("/rolepermissions", rolepermissionRoute);
app.use("/applicantforms", ApplicantFormRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware (optional)
// app.use(express.json());

// // Sample Route
// app.get("/create", (req, res) => {
//   res.send("Hello, Express Create user profile!");
// });

// app.get("/get", (req, res) => {
//   res.send("Hello, Express get!");
// });

// app.patch("/update", (req, res) => {
//   res.send("Hello, Express update!");
// });

// app.get("/:getById", (req, res) => {
//   res.send("Hello, Express getById!");
// });

// app.delete("/delete", (req, res) => {
//   res.send("Hello, Express Delete!");
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
