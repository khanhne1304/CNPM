import { createUser, authenticate, generateResetToken, resetPassword } from "../services/userService.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "EMAIL_PASSWORD_REQUIRED" });
    const created = await createUser({ name, email, password });
    res.status(201).json({ message: "REGISTER_SUCCESS", user: created });
  } catch (e) {
    if (e.message === "EMAIL_IN_USE") return res.status(409).json({ message: e.message });
    res.status(500).json({ message: "SERVER_ERROR" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "EMAIL_PASSWORD_REQUIRED" });
    const { token, user } = await authenticate({ email, password });
    res.json({ message: "LOGIN_SUCCESS", token, user });
  } catch (e) {
    if (e.message === "INVALID_CREDENTIALS") return res.status(401).json({ message: e.message });
    res.status(500).json({ message: "SERVER_ERROR" });
  }
}

export async function homepage(req, res) {
  res.json({ message: `Welcome, ${req.user?.username}!`, user: req.user });
}

// Forgot Password
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "EMAIL_REQUIRED" });

    const resetToken = await generateResetToken(email);
    const resetLink = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password?token=${resetToken}`;

    res.json({ message: "RESET_TOKEN_SENT", resetLink });
  } catch (e) {
    if (e.message === "USER_NOT_FOUND") return res.status(404).json({ message: e.message });
    res.status(500).json({ message: "SERVER_ERROR" });
  }
}

export async function handleResetPassword(req, res) {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ message: "TOKEN_PASSWORD_REQUIRED" });

    const updated = await resetPassword(token, password);
    res.json({ message: "PASSWORD_RESET_SUCCESS", user: updated });
  } catch (e) {
    if (e.message === "TOKEN_INVALID_OR_EXPIRED") return res.status(400).json({ message: e.message });
    res.status(500).json({ message: "SERVER_ERROR" });
  }
}
