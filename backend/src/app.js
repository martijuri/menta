import express from "express";
import { pool } from "./db.js";
import transaccionesRouter from "./routes/transacciones.routes.js";
import marcosRouter from "./routes/marcos.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import { getUserProfile, validateToken, validateTokenMiddleware, verifyAdmin } from "./controllers/usuarios.controller.js";
import { login, auth } from "./routes/authentication.routes.js";
import utilRouter from "./routes/utils.routes.js"
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors( { origin: "http://localhost:3000" }));

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