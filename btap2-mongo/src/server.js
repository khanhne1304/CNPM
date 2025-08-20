const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require("./config/mongo");
const webRoutes = require("./route/web"); // chú ý: thư mục bạn đặt tên là "route" chứ không phải "routes"

const app = express();
const port = 8088;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Cấu hình view engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Kết nối MongoDB
connectDB();

// Routes
app.use("/", webRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
