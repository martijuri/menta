import { pool } from "../db.js";
import { updateStockMarco } from "./marcos.controller.js";

// Controladores de transacciones

// Funcion para obtener todas las transacciones
const getTransacciones = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.*, c.*, it.*
      FROM transacciones t
      LEFT JOIN cuentas c ON t.idCuentaTransaccion = c.idCuenta
      LEFT JOIN itemtransaccion it ON t.idTransaccion = it.idTransaccionItemTransaccion
    `);

    const transaccionesMap = rows.reduce((acc, row) => {
      const transaccionId = row.idTransaccion;
      if (!acc[transaccionId]) {
        acc[transaccionId] = {
          ...row,
          cuenta: {
            idCuenta: row.idCuenta,
            cuentaNombre: row.cuentaNombre,
            cuentaCuit: row.cuentaCuit,
            cuentaTelefono: row.cuentaTelefono,
            cuentaDireccion: row.cuentaDireccion,
          },
          itemsTransaccion: [],
        };
      }
      if (row.idItemTransaccion) {
        acc[transaccionId].itemsTransaccion.push({
          idItemTransaccion: row.idItemTransaccion,
          idMarcoItemTransaccion: row.idMarcoItemTransaccion,
          cantidadItemTransaccion: row.cantidadItemTransaccion,
        });
      }
      return acc;
    }, {});

    const transaccionesConCuentas = Object.values(transaccionesMap);
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
    const [rows] = await pool.query(
      `
      SELECT t.*, c.*, it.*
      FROM transacciones t
      LEFT JOIN cuentas c ON t.idCuentaTransaccion = c.idCuenta
      LEFT JOIN itemtransaccion it ON t.idTransaccion = it.idTransaccionItemTransaccion
      WHERE t.idTransaccion = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }

    const transaccion = {
      ...rows[0],
      cuenta: {
        idCuenta: rows[0].idCuenta,
        nombreCuenta: rows[0].nombreCuenta,
        // Agrega otros campos de la cuenta aquí
      },
      itemsTransaccion: rows.map((row) => ({
        idItemTransaccion: row.idItemTransaccion,
        idMarcoItemTransaccion: row.idMarcoItemTransaccion,
        cantidadItemTransaccion: row.cantidadItemTransaccion,
        // Agrega otros campos del itemTransaccion aquí
      })),
    };

    res.json(transaccion);
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
    const [results] = await pool.query(
      "INSERT INTO transacciones (ventaTransaccion, fechaTransaccion, idCuentaTransaccion, fechaEntrega) VALUES (?, ?, ?, ?)",
      [
        ventaTransaccion,
        formattedFechaTransaccion,
        idCuentaTransaccion,
        formattedFechaEntrega,
      ]
    );
    res.status(201).json({
      message: "Transacción creada exitosamente",
      id: results.insertId,
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

    // Si se está agregando una fecha de entrega, actualizar el stock
    if (fechaEntrega) {
      const [itemsTransaccion] = await pool.query(
        "SELECT idMarcoItemTransaccion, cantidadItemTransaccion FROM itemtransaccion WHERE idTransaccionItemTransaccion = ?",
        [id]
      );

      await Promise.all(
        itemsTransaccion.map(async (item) => {
          await updateStockMarco(
            item.idMarcoItemTransaccion,
            -item.cantidadItemTransaccion
          );
        })
      );
    }

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
    const [results] = await pool.query(
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
  console.log("body recibido: ", req.body);
  console.log(
    "items recibidos: ",
    itemsTransaccion,
    "idTransaccion: ",
    idTransaccionItemTransaccion
  );

  try {
    // Obtener la transacción para verificar si es una venta
    const [transaccion] = await pool.query(
      "SELECT ventaTransaccion FROM transacciones WHERE idTransaccion = ?",
      [idTransaccionItemTransaccion]
    );

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

        // Si la transacción no es una venta, actualizar el stock del marco
        if (transaccion[0].ventaTransaccion === 0) {
          await updateStockMarco(
            item.idMarcoItemTransaccion,
            item.cantidadItemTransaccion
          );
        }
      })
    );

    res.status(201).json({
      message: "ItemsTransaccion added",
      data: results,
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
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // Ajustar la fecha para la zona horaria
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
