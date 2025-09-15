import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  // Expect: Authorization: Bearer <token>
  const value = req.headers.authorization || "";
  const [type, token] = value.split(" ");
  if (type !== "Bearer" || !token) return res.status(401).json({ message: "NO_TOKEN" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "INVALID_TOKEN" });
  }
}
