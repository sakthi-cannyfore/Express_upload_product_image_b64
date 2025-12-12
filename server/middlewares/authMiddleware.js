import jwt from "jsonwebtoken";

export async function authMiddle(req, res, next) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(404).json({
      message: "UnAthorized user ",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decode;
    next();
  } catch (error) {}
}
