import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, select: false }, // select: false để không trả về password trừ khi .select("+password")
    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
