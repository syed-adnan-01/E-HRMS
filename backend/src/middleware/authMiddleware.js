import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    console.warn(`[Auth] Rejected: No token provided for ${req.method} ${req.url}`);
    return res.status(401).json({ message: "No Token" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    console.error(`[Auth] Rejected: Invalid token. Error: ${err.message}`);
    res.status(401).json({ message: "Invalid Token" })
  }
}
