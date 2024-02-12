const express = require("express");
const env = require("./config/envConfig");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const notesRoutes = require("./routes/notesRoutes");
const connect = require("./config/db");

const app = express();
// Database connection
connect();

// Middleware
app.use(express.json());

app.get("/", function (req, res) {
  res.json({ msg: "Welcome to pathshala" });
});

// Routes
app.use("/api", userRoutes);
app.use("/api", subjectRoutes);
app.use("/api", notesRoutes);

const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
