const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/mongo");
const webRoutes = require("./route/web");

const app = express();
const port = 8088;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Kết nối MongoDB
connectDB();

// Routes
app.use("/", webRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
