const express = require("express");
const router = express.Router();
const UserController = require("../controllers/homeController");

// Hiển thị danh sách user
router.get("/get-crud", UserController.getUsers);

// Hiển thị form thêm
router.get("/create-crud", UserController.showCreateForm);

// Thêm user
router.post("/post-crud", UserController.createUser);

// Hiển thị form update
router.get("/edit-crud", UserController.editUser);

// Cập nhật user
router.post("/put-crud", UserController.updateUser);

// Xóa user
router.get("/delete-crud", UserController.deleteUser);

module.exports = router;
