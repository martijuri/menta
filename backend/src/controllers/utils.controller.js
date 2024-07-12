import { pool } from "../db.js";

// function to get all items of a transaction
export async function getItemsTransacciones(id) {
    try{
        const items = await pool.query('SELECT * FROM itemTransacciones WHERE idTransaccionItemTransaccion = ?', [id]);
        return items;
    }
    catch (error) {
        console.error(error);
        return { message: "Error al obtener los items de la transaccion", error: error.message };
    }
}

export async function getTiposMarcos(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM tipoMarcos");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al obtener los tipos de marcos",
            error: error.message,
        });
    }
}