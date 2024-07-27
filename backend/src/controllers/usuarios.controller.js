import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Consulta a la base de datos para verificar si el usuario existe
export const confirmUsuario = async (username, password) => {
  const response = await pool.query(
    "SELECT * FROM usuarios WHERE username = ? AND contraseña = ?",
    [username, password]
  );

  if (response[0].length > 0) return true;
  return false;
};

//Generar token de acceso
export const generateAccessToken = (username) => {
  return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

//Validar token de acceso
export const validateToken = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  const token = accessToken && accessToken.split(" ")[1];

  if (token == null) return res.status(401).send("No token provided");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
