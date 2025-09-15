import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.js";

export async function createUser({ name, email, password }) {
  const existed = await User.findOne({ email });
  if (existed) throw new Error("EMAIL_IN_USE");

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
}

export async function authenticate({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("INVALID_CREDENTIALS");

  const payload = { id: user._id.toString(), role: user.role, username: user.name || user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  return {
    token,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
  };
}

export async function generateResetToken(email) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("USER_NOT_FOUND");

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await user.save();

  return resetToken;
}

export async function resetPassword(token, newPassword) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) throw new Error("TOKEN_INVALID_OR_EXPIRED");

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return { id: user._id.toString(), email: user.email };
}
