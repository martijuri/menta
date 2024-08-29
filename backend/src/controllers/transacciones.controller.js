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
  const {
    ventaTransaccion,
    fechaTransaccion,
    idCuentaTransaccion,
    fechaEntrega,
  } = req.body;

  // Convertir las fechas al formato correcto
  const formattedFechaTransaccion = formatDateTime(fechaTransaccion);
  const formattedFechaEntrega = formatDateTime(fechaEntrega);

  try {
    const results = await pool.query(
      "INSERT INTO transacciones (ventaTransaccion, fechaTransaccion, idCuentaTransaccion, fechaEntrega) VALUES (?, ?, ?, ?)",
      [
        ventaTransaccion,
        formattedFechaTransaccion,
        idCuentaTransaccion,
        formattedFechaEntrega,
      ]
    );
    res
      .status(201)
      .json({
        message: "Transacción creada exitosamente",
        id: results[0].insertId,
      });
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
  const {
    ventaTransaccion,
    fechaTransaccion,
    idCuentaTransaccion,
    fechaEntrega,
  } = req.body;

  // Convertir las fechas al formato correcto
  const formattedFechaTransaccion = formatDateTime(fechaTransaccion);
  const formattedFechaEntrega = formatDateTime(fechaEntrega);
  console.log("transaccion a actualizar: ", req.body);

  try {
    const response = await pool.query(
      "UPDATE transacciones SET ventaTransaccion = ?, fechaTransaccion = ?, idCuentaTransaccion = ?, fechaEntrega = ? WHERE idTransaccion = ?",
      [
        ventaTransaccion,
        formattedFechaTransaccion,
        idCuentaTransaccion,
        formattedFechaEntrega,
        id,
      ]
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

// Funcion para obtener todos los itemTransacciones correspondiente a una transaccion (por id)
const getItemsTransaccion = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM itemtransaccion WHERE idTransaccionItemTransaccion = ?",
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Funcion para obtener un itemTransaccion por su id
const getItemTransaccion = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query(
      "SELECT * FROM itemtransaccion WHERE idItemTransaccion = ?",
      [id]
    );
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el itemTransaccion",
      error: error.message,
    });
  }
};

// Funcion para añadir un itemTransaccion
const postItemTransaccion = async (req, res) => {
  const { item } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO itemtransaccion ( idTransaccionItemTransaccion, 	idMarcoItemTransaccion, cantidadItemTransaccion) VALUES (?, ?, ?)",
      [
        item.idTransaccionItemTransaccion,
        item.idMarcoItemTransaccion,
        item.cantidadItemTransaccion,
      ]
    );
    const insertedId = results.insertId;
    res.status(201).json({
      message: "ItemTransaccion added",
      id: insertedId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al añadir el itemTransaccion",
      error: error.message,
    });
  }
};

// Función para añadir muchos itemTransaccion que corresponden a una misma transaccion
const postItemsTransaccion = async (req, res) => {
  const { idTransaccionItemTransaccion, itemsTransaccion } = req.body;
  if (!itemsTransaccion || !Array.isArray(itemsTransaccion)) {
    return res.status(400).json({
      message: "itemsTransaccion debe ser un array",
    });
  }
  console.log("items recibidos: ", itemsTransaccion);
  try {
    const results = await Promise.all(
      itemsTransaccion.map(async (item) => {
        await pool.query(
          "INSERT INTO itemtransaccion (idTransaccionItemTransaccion, idMarcoItemTransaccion, cantidadItemTransaccion) VALUES (?, ?, ?)",
          [
            idTransaccionItemTransaccion,
            item.idMarcoItemTransaccion,
            item.cantidadItemTransaccion,
          ]
        );
      })
    );
    res.status(201).json({
      message: "ItemsTransaccion added",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al añadir los itemsTransaccion",
      error: error.message,
    });
  }
};

// Funcion para actualizar un itemTransaccion
const patchItemTransaccion = async (req, res) => {
  const { id } = req.params;
  const { cantidadItemTransaccion, idMarcoItemTransaccion } = req.body;
  try {
    const response = await pool.query(
      "UPDATE itemtransaccion SET cantidadItemTransaccion = ?, idMarcoItemTransaccion = ? WHERE idItemTransaccion = ?",
      [cantidadItemTransaccion, idMarcoItemTransaccion, id]
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el itemTransaccion",
      error: error.message,
    });
  }
};

// Funcion para eliminar un itemTransaccion
const deleteItemTransaccion = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      "DELETE FROM itemtransaccion WHERE idItemTransaccion = ?",
      [id]
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar el itemTransaccion",
      error: error.message,
    });
  }
};

// Función para formatear la fecha al formato YYYY-MM-DD HH:MM:SS
const formatDateTime = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export {
  getTransacciones,
  postTransaccion,
  getTransaccion,
  patchTransaccion,
  deleteTransaccion,
  getItemTransaccion,
  getItemsTransaccion,
  postItemTransaccion,
  postItemsTransaccion,
  patchItemTransaccion,
  deleteItemTransaccion,
};
