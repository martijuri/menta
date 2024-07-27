import { pool } from "../db.js";
import { getItemsTransacciones } from "./utils.controller.js";
import { getCuenta } from "./utils.controller.js";

// Controladores de transacciones

// Funcion para obtener todas las transacciones
const getTransacciones = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM transacciones");
    const transaccionesConCuentas = await Promise.all(
      rows.map(async (row) => {
        const cuenta = await getCuenta(row.idCuentaTransaccion);
        const itemsTransaccion = await getItemsTransacciones(row.idTransaccion);
        return { ...row, cuenta, itemsTransaccion };
      })
    );
    res.json(transaccionesConCuentas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las transacciones",
      error: error.message,
    });
  }
};

// Funcion para obtener una transaccion por su id
const getTransaccion = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query(
      "SELECT * FROM transacciones WHERE idTransaccion = ?",
      [id]
    );
    const [itemsTransaccion] = await getItemsTransacciones(id);
    res.json({ results, itemsTransaccion });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener la transaccion",
      error: error.message,
    });
  }
};

// Funcion para añadir una transaccion
const postTransaccion = async (req, res) => {
  const { ventaTransaccion, fechaTransaccion, idCuentaTransaccion, fechaEntrega } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO transacciones (ventaTransaccion, fechaTransaccion, idCuentaTransaccion, fechaEntrega) VALUES (?, ?, ?, ?)",
      [ventaTransaccion, fechaTransaccion, idCuentaTransaccion, fechaEntrega]
    );
    console.log(results);
    res.status(201).send(`Transaccion added`);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al añadir la transaccion",
      error: error.message,
    });
  }
};

// Funcion para actualizar una transaccion
const patchTransaccion = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      "UPDATE transacciones SET ? WHERE idTransaccion = ?",
      [req.body, id]
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar la transaccion",
      error: error.message,
    });
  }
};

// Funcion para eliminar una transaccion
const deleteTransaccion = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      "DELETE FROM transacciones WHERE idTransaccion = ?",
      [id]
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar la transaccion",
      error: error.message,
    });
  }
};

export {
  getTransacciones,
  postTransaccion,
  getTransaccion,
  patchTransaccion,
  deleteTransaccion,
};
