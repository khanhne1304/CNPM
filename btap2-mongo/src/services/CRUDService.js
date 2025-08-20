import User from "../models/user.js";
import bcrypt from "bcryptjs";

const createNewUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const newUser = new User({ ...data, password: hashPassword });
  return await newUser.save();
};

const getAllUsers = async () => {
  return await User.find({});
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export default { createNewUser, getAllUsers, getUserById, updateUser, deleteUser };
