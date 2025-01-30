import { useEffect, createContext, useState, useContext, useCallback } from "react";
import {
  getTransacciones,
  postTransaccion,
  postItemsTransaccion,
  patchTransaccion,
  deleteTransaccion,
  getItemsTransaccion,
  postItemTransaccion,
  patchItemTransaccion,
  deleteItemTransaccion,
} from "../api/transacciones.api";
import { useStock } from "./StockContext";

export const TransaccionesContext = createContext();

export const TransaccionesProvider = ({ children }) => {
  const [transacciones, setTransacciones] = useState([]);
  const transaccionVacia = {
    ventaTransaccion: true,
    idTransaccion: null,
    idCuentaTransaccion: null,
    fechaTransaccion: new Date().toISOString().split("T")[0],
    fechaEntrega: "",
    itemsTransaccion: [],
  };
  const { cargarStock } = useStock();

  const cargarTransacciones = useCallback(async () => {
    try {
      const data = await getTransacciones();
      setTransacciones(data);
      cargarStock();
    } catch (error) {
      console.error("Error al cargar las transacciones:", error);
    }
  }, [cargarStock]);

  useEffect(() => {
    cargarTransacciones();
  }, [cargarTransacciones]);

  // Función para buscar una transacción por ID
  const getTransaccionPorId = (id) => {
    return transacciones.find((transaccion) => transaccion.idTransaccion === id);
  };

  const postTransaccionContext = async (transaccion) => {
    try {
      const response = await postTransaccion(transaccion);
      setTransacciones((prevTransacciones) => [...prevTransacciones, response]);
      await cargarTransacciones(); // Forzar la recarga de transacciones
      return response;
    } catch (error) {
      console.error("Error al crear la transacción:", error);
    }
  };

  const deleteTransaccionContext = async (idTransaccion) => {
    try {
      await deleteTransaccion(idTransaccion);
      setTransacciones((prevTransacciones) =>
        prevTransacciones.filter((transaccion) => transaccion.idTransaccion !== idTransaccion)
      );
      await cargarTransacciones(); // Forzar la recarga de transacciones
    } catch (error) {
      console.error("Error al eliminar la transacción:", error);
    }
  };

  const patchTransaccionContext = async (transaccion) => {
    if (!transaccion.idTransaccion) return;
    try {
      const nuevaTransaccion = {
        ...transaccion,
        idCuentaTransaccion: transaccion.cuenta ? transaccion.cuenta.idCuenta : null,
      };
      const response = await patchTransaccion(nuevaTransaccion.idTransaccion, nuevaTransaccion);
      setTransacciones((prevTransacciones) =>
        prevTransacciones.map((t) =>
          t.idTransaccion === nuevaTransaccion.idTransaccion ? response : t
        )
      );
      await cargarTransacciones(); // Forzar la recarga de transacciones
    } catch (error) {
      console.error("Error al actualizar la transacción:", error);
    }
  };

  const postItemsTransaccionContext = async (idTransaccionItemTransaccion, itemsTransaccion) => {
    if (itemsTransaccion.length === 0) return;
    try {
      await postItemsTransaccion(idTransaccionItemTransaccion, itemsTransaccion);
      await cargarTransacciones(); // Forzar la recarga de transacciones
    } catch (error) {
      console.error("Error al crear los items de la transacción:", error);
    }
  };

  const getItemsTransaccionContext = async (idTransaccion) => {
    return await getItemsTransaccion(idTransaccion);
  };

  const postItemTransaccionContext = async (itemTransaccion) => {
    itemTransaccion.cantidadItemTransaccion ||= 0;
    await postItemTransaccion(itemTransaccion);
    await cargarTransacciones(); // Forzar la recarga de transacciones
  };

  const patchItemTransaccionContext = async (idItemTransaccion, itemTransaccion) => {
    await patchItemTransaccion(idItemTransaccion, itemTransaccion);
    await cargarTransacciones(); // Forzar la recarga de transacciones
  };

  const deleteItemTransaccionContext = async (idItemTransaccion) => {
    await deleteItemTransaccion(idItemTransaccion);
    await cargarTransacciones(); // Forzar la recarga de transacciones
  };

  return (
    <TransaccionesContext.Provider
      value={{
        transacciones,
        transaccionVacia,
        setTransacciones,
        getTransaccionPorId,
        postTransaccionContext,
        deleteTransaccionContext,
        postItemsTransaccionContext,
        patchTransaccionContext,
        cargarTransacciones,
        postItemTransaccionContext,
        deleteItemTransaccionContext,
        patchItemTransaccionContext,
        getItemsTransaccionContext,
      }}
    >
      {children}
    </TransaccionesContext.Provider>
  );
};

export const useTransacciones = () => {
  const context = useContext(TransaccionesContext);
  if (!context) {
    throw new Error("useTransacciones debe estar dentro del proveedor TransaccionesProvider");
  }
  return context;
};