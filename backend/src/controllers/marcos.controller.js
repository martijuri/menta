import { pool } from "../db.js";

const getMarcos = async (req, res) => {
  try {
    const query = `
      SELECT marcos.idMarco, idTipoMarco, marcos.stockMarco, marcos.precioDolar
      FROM marcos
      JOIN tipos ON marcos.idTipoMarco = tipos.idTipo
    `;
    const [rows] = await pool.query(query);

    // Obtener la cantidad reservada para todos los marcos en una sola consulta
    const reservadosQuery = `
      SELECT it.idMarcoItemTransaccion, SUM(it.cantidadItemTransaccion) AS totalReservados
      FROM itemtransaccion it
      JOIN transacciones t ON it.idTransaccionItemTransaccion = t.idTransaccion
      WHERE t.ventaTransaccion = 1 AND t.fechaEntrega IS NULL
      GROUP BY it.idMarcoItemTransaccion
    `;
    const [reservadosRows] = await pool.query(reservadosQuery);

    // Crear un mapa de idMarco a totalReservados
    const reservadosMap = reservadosRows.reduce((acc, row) => {
      acc[row.idMarcoItemTransaccion] = row.totalReservados || 0;
      return acc;
    }, {});

    // Combinar los resultados
    const marcosConReservados = rows.map((marco) => ({
      ...marco,
      reservados: reservadosMap[marco.idMarco] || 0,
    }));

    res.json(marcosConReservados);
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
    res.status(201).send(`Lente added with ID: ${results.insertId}`);
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
    const [results] = await pool.query("SELECT * FROM marcos WHERE idMarco = ?", [id]);
    res.json(results[0]);
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
    const [results] = await pool.query("DELETE FROM marcos WHERE idMarco = ?", [id]);
    res.json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al eliminar el marco", error: error.message });
  }
};

const updateStockMarco = async (idMarco, cantidad) => {
  try {
    const [results] = await pool.query(
      "UPDATE marcos SET stockMarco = stockMarco + ? WHERE idMarco = ?",
      [cantidad, idMarco]
    );
    return results;
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar el stock del marco");
  }
};

export { getMarcos, postMarco, getMarco, patchMarco, deleteMarco, updateStockMarco };