import { useEffect, createContext, useState, useContext } from "react";
import {
  getTransacciones,
  postTransaccion,
  postItemTransaccion,
  postItemsTransaccion,
  patchTransaccion,
  patchItemTransaccion,
  deleteItemTransaccion,
  deleteTransaccion,
} from "../api/transacciones.api";

export const TransaccionesContext = createContext();

export const TransaccionesProvider = ({ children }) => {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    const cargarTransacciones = async () => {
      try {
        const data = await getTransacciones();
        setTransacciones(data);
        console.log("Transacciones cargadas:", data);
      } catch (error) {
        console.error("Error al cargar las transacciones:", error);
      }
    };
    cargarTransacciones();
  }, []);

  // Función para buscar una transacción por ID
  const getTransaccionPorId = (id) => {
    return transacciones.find((transaccion) => transaccion.idTransaccion == id);
  };

  const postTransaccionContext = async (transaccion) => {
    
    try {
      const response = await postTransaccion(transaccion);
      console.log(response);
    } catch (error) {
      console.error("Error al crear la transacción:", error);
    }
  };

  const patchTransaccionContext = async (transaccion) => {
    if (!transaccion.idTransaccion) return;
    try {
      const nuevaTransaccion = {
        ...transaccion,
        idCuentaTransaccion: transaccion.cuenta ? transaccion.cuenta.idCuenta : null,
      };
      const response = await patchTransaccion(
        nuevaTransaccion.idTransaccion,
        nuevaTransaccion
      );
      console.log("patchTransaccionContext: ", response);
    } catch (error) {
      console.error("Error al actualizar la transacción:", error);
    }
  };

  const postItemsTransaccionContext = async (idTransaccionItemTransaccion, itemsTransaccion) => {
    if(itemsTransaccion.length === 0) return;
    try {
      const response = await postItemsTransaccion(idTransaccionItemTransaccion, itemsTransaccion);
      console.log("postItemsTransaccionContext: ", response);
    } catch (error) {
      console.error("Error al crear los items de la transacción:", error);
    }
  };
  return (
    <TransaccionesContext.Provider
      value={{
        transacciones,
        setTransacciones,
        getTransaccionPorId,
        postTransaccionContext,
        postItemsTransaccionContext,
        patchTransaccionContext,}}
    >
      {children}
    </TransaccionesContext.Provider>
  );
};

export const useTransacciones = () => {
  const context = useContext(TransaccionesContext);
  if (!context) {
    throw new Error(
      "useTransacciones debe estar dentro del proveedor TransaccionesProvider"
    );
  }
  return context;
};
