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

// Validar token de acceso
export const validateToken = (req, res) => {
  const { token } = req.body;

  // Si no se proporciona un token, devolver un error 400
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  // Verificar el token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Si el token es inválido, devolver un error 403
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    res.json({ valid: true, user });
  });
};

export const validateTokenMiddleware = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  const token = accessToken && accessToken.split(" ")[1];

  if (token == null) return res.status(401).send("No token provided");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};