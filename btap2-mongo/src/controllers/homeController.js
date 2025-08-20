const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("Users from DB:", users);
    res.render("users/list", { datalist: users });
  } catch (err) {
    console.error(err);
    res.send("Lỗi khi lấy users");
  }
};


// Form tạo user
exports.showCreateForm = (req, res) => {
  res.render("users/insertUser");
};

// Tạo user
exports.createUser = async (req, res) => {
  await User.create(req.body);
  res.redirect("/get-crud");
};

// Lấy form update
exports.editUser = async (req, res) => {
  const user = await User.findById(req.query.id);
  res.render("users/updateUser", { data: user });
};

// Cập nhật user
exports.updateUser = async (req, res) => {
  const { id, firstName, lastName, address } = req.body;
  await User.findByIdAndUpdate(id, { firstName, lastName, address });
  res.redirect("/get-crud");
};

// Xóa user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.query.id);
  res.redirect("/get-crud");
};
