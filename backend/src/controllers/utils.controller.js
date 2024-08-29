import { pool } from "../db.js";

// Funcion para obtener los items de una transaccion
export async function getItemsTransacciones(id) {
  try {
    const items = await pool.query(
      "SELECT * FROM itemtransaccion WHERE idTransaccionItemTransaccion = ?",
      [id]
    );
    return items;
  } catch (error) {
    console.error(error);
    return {
      message: "Error al obtener los items de la transaccion",
      error: error.message,
    };
  }
}

// Funcion para obtener los tipos de marcos
export async function getTiposMarcos(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM tipos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener los tipos de marcos",
      error: error.message,
    });
  }
}

// Funcion para obtener el tipo de marco con el id
export async function getTipoMarco(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tipos WHERE idTipo = ?",
      [req.params.id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el tipo de marco",
      error: error.message,
    });
  }
}

// Funcion para obtener la cuenta con el id
export async function getCuenta(id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM cuentas WHERE idCuenta = ?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la cuenta"); // Lanza un error que se puede capturar en getPedidos
  }
}

// Funcion para obtener las cuentas
export async function getCuentas(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM cuentas");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las cuentas",
      error: error.message,
    });
  }
}

// Funcion para actualizar una cuenta
export async function patchCuenta(req, res) {
  try {
    const { id } = req.params;
    const  cuenta  = req.body;
    await pool.query(
      "UPDATE cuentas SET cuentaNombre = ?, cuentaCuit = ?, cuentaTelefono = ?, cuentaDireccion = ? WHERE idCuenta = ?",
      [cuenta.cuentaNombre, cuenta.cuentaCuit, cuenta.cuentaTelefono, cuenta.cuentaDireccion, id]
    );
    res.json({ message: "Cuenta actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar la cuenta",
      error: error.message,
    });
  }
}

// Funcion para crear una cuenta
export async function postCuenta(req, res) {
  try {
    const { cuentaNombre, cuentaCuit, cuentaDireccion, cuentaTelefono } = req.body;
    await pool.query(
      "INSERT INTO cuentas (cuentaNombre, cuentaCuit, cuentaTelefono, cuentaDireccion) VALUES (?, ?, ?, ?)",
      [cuentaNombre, cuentaCuit, cuentaTelefono, cuentaDireccion]
    );
    res.json({ message: "Cuenta creada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la cuenta",
      error: error.message,
    });
  }
}

// Funcion para obtener los pedidos (transacciones con ventaTransaccion = 1 y fechaEntrega = NULL)
export async function getPedidos(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM transacciones WHERE ventaTransaccion = 1 AND fechaEntrega IS NULL"
    );

    const pedidosConCuentas = await Promise.all(
      rows.map(async (row) => {
        const cuenta = await getCuenta(row.idCuentaTransaccion);
        const itemsTransaccion = await getItemsTransacciones(row.idTransaccion);
        return { ...row, cuenta, itemsTransaccion };
      })
    );
    res.json(pedidosConCuentas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener los pedidos",
      error: error.message,
    });
  }
}

// Funcion para obtener las ventas (transacciones con ventaTransaccion = 1 y fechaEntrega != NULL)
export async function getVentas(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM transacciones WHERE ventaTransaccion = 1 AND fechaEntrega IS NOT NULL"
    );

    const ventasConCuentas = await Promise.all(
      rows.map(async (row) => {
        const cuenta = await getCuenta(row.idCuentaTransaccion);
        const itemsTransaccion = await getItemsTransacciones(row.idTransaccion);
        return { ...row, cuenta, itemsTransaccion };
      })
    );
    res.json(ventasConCuentas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener los ventas",
      error: error.message,
    });
  }
}