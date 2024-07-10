import e, { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM tipos");
    res.json(rows);
});

export default router;