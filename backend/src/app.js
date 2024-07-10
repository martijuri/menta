import express from "express";
import { pool } from "./db.js";
import transaccionesRouter from "./routes/transacciones.routes.js";
import marcosRouter from "./routes/marcos.routes.js";
import tiposRouter from "./routes/tipos.routes.js";
import { validateToken} from "./controllers/usuarios.controller.js";
import { login, auth } from "./routes/authentication.routes.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/login", login);
app.post("/auth", auth);

// Aplicar middleware a todas las rutas que comiencen con '/api'
app.use('/api', validateToken);

// Montar los routers específicos
app.use('/api/transacciones', transaccionesRouter);
app.use('/api/marcos', marcosRouter);
app.use('/api/tipos', tiposRouter);


app.get("/ping", async (req, res) => {
  const message = await pool.query("SELECT 'Pong' AS message");
  res.json(message[0]);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});