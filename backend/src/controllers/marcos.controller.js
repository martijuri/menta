import { pool } from "../db.js";

const getMarcos = async (req, res) => {
  try {
    const query = `
      SELECT marcos.idMarco, tipos.Tipo as idTipoMarco, marcos.stockMarco, marcos.precioDolar
      FROM marcos
      JOIN tipos ON marcos.idTipoMarco = tipos.idTipo
    `;
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los marcos", error: error.message });
  }
};

const postMarco = async (req, res) => {
  const { idMarco, idTipoMarco, stockMarco, precioDolar } = req.body;
  try {
    const [results] = await pool.query(
      "INSERT INTO marcos (idMarco, idTipoMarco, stockMarco, precioDolar) VALUES (?, ?, ?, ?)",
      [idMarco, idTipoMarco, stockMarco, precioDolar]
    );
    res.status(201).send(`Lente added with ID: ${results.idMarco}`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al añadir el marco", error: error.message });
  }
};

const getMarco = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("SELECT * FROM marcos WHERE idMarco = ?", [id]);
    res.json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener el marco", error: error.message });
  }
};

const patchMarco = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query(
      "UPDATE marcos SET ? WHERE idMarco = ?",
      [req.body, id]
    );
    res.json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el marco", error: error.message });
  }
};

const deleteMarco = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query("DELETE FROM marcos WHERE idMarco = ?", [
      id,
    ]);
    res.json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al eliminar el marco", error: error.message });
  }
};

export { getMarcos, postMarco, getMarco, patchMarco, deleteMarco };