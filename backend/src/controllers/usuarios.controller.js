import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  const usuarios = await pool.query("SELECT * FROM usuarios");
  res.json(usuarios[0]);
}

// Crear un nuevo usuario
export const postUsuario = async (req, res) => {
  const { username, password, email, administrador = 0 } = req.body;
  const newUser = { username, password, email, administrador };

  await pool.query("INSERT INTO usuarios SET ?", [newUser]);
  res.json({ message: "Usuario creado" });
}

// Obtener un usuario por su ID
export const getUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);

  if (usuario[0].length > 0) {
    res.json(usuario[0]);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
}

// Actualizar un usuario por su ID
export const patchUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, password, email, administrador } = req.body;
  const updatedUser = { username, password, email, administrador };

  try {
    await pool.query("UPDATE usuarios SET ? WHERE id = ?", [updatedUser, id]);
    const [result] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    res.json({ message: "Usuario actualizado", user: result[0] });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando el usuario", error });
  }
}

// Eliminar un usuario por su ID
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
  res.json({ message: "Usuario eliminado" });
}

// Autenticar un usuario
export const login = async (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario y la contraseña son correctos
  const isValid = await confirmUsuario(username, password);

  if (isValid) {
    const accessToken = generateAccessToken(username);
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
}

//Consulta a la base de datos para verificar si el usuario existe
export const confirmUsuario = async (username, password) => {
  const response = await pool.query(
    "SELECT * FROM usuarios WHERE username = ? AND password = ?",
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

// Obtener el perfil del usuario autenticado
export const getUserProfile = async (req, res) => {
  const { username } = req.user; // Obtén el username del token

  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [username]);
    if (rows.length > 0) {
      res.json(rows[0]); // Devuelve la información del usuario
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en la base de datos', error });
  }
};

// adminMiddleware.js
export const verifyAdmin = async (req, res, next) => {
  try {
    const { username } = req.user; // Obtén el username del token
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