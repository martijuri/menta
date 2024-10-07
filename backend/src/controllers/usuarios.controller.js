import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();


// Crear un nuevo usuario
export const postUsuario = async (req, res) => {
  const { username, password, email, administrador = 0 } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword, email, administrador };

  try {
    await pool.query("INSERT INTO usuarios SET ?", [newUser]);
    res.json({ message: "Usuario creado" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

// Obtener un usuario por su ID
export const getUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);

    if (usuario.length > 0) {
      res.json(usuario[0]);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

// Actualizar un usuario por su ID
export const patchUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, password, email, administrador } = req.body;
  const updatedUser = { username, email, administrador };

  if (password) {
    updatedUser.password = await bcrypt.hash(password, 10);
  }

  try {
    await pool.query("UPDATE usuarios SET ? WHERE id = ?", [updatedUser, id]);
    const [result] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    res.json({ message: "Usuario actualizado", user: result[0] });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando el usuario", error });
  }
};

// Eliminar un usuario por su ID
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

// Autenticar un usuario
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [usuario] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [username]);

    if (usuario.length > 0 && await bcrypt.compare(password, usuario[0].password)) {
      const accessToken = generateAccessToken(username);
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al autenticar el usuario", error });
  }
};

// Generar token de acceso
export const generateAccessToken = (username) => {
  return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

// Validar token de acceso
export const validateToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
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

// Obtener el perfil del usuario autenticado
export const getUserProfile = async (req, res) => {
  const { username } = req.user;

  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [username]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en la base de datos', error });
  }
};

// Verificar si el usuario es administrador
export const verifyAdmin = async (req, res, next) => {
  try {
    const { username } = req.user;
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [username]);

    if (rows.length > 0 && rows[0].administrador === 1) {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};
