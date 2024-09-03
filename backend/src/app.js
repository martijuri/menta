import express from "express";
import { pool } from "./db.js";
import transaccionesRouter from "./routes/transacciones.routes.js";
import marcosRouter from "./routes/marcos.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import { getUserProfile, validateToken, validateTokenMiddleware, verifyAdmin } from "./controllers/usuarios.controller.js";
import { login, auth } from "./routes/authentication.routes.js";
import utilRouter from "./routes/utils.routes.js";
import cors from "cors";

const app = express();

app.get('/test-db', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT 1 + 1 AS solution');
    res.send(`Database connection successful: ${rows[0].solution}`);
  } catch (error) {
    res.status(500).send(`Database connection failed: ${error.message}`);
  }
});


console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PORT:', process.env.DB_PORT);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configurar CORS usando la variable de entorno
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Permitir todos los orígenes si no se define CORS_ORIGIN
};
app.use(cors(corsOptions));

app.use("/login", login);
app.post("/auth/validate", validateToken);
app.post("/auth", auth);

// Aplicar middleware a todas las rutas que comiencen con '/api'
app.use("/api", validateTokenMiddleware);

app.get('/api/profile', getUserProfile);
// Montar los routers específicos
app.use("/api", verifyAdmin);
app.use("/api", utilRouter);
app.use("/api/transacciones", transaccionesRouter);
app.use("/api/marcos", marcosRouter);
app.use("/api/usuarios", usuariosRouter);

app.get("/ping", async (req, res) => {
  const message = await pool.query("SELECT 'Pong' AS message");
  res.json(message[0]);
});

// Redirigir a la página de login si no se encuentra la ruta
app.get("*", (req, res) => {
  res.redirect("/login");
});

export default app;