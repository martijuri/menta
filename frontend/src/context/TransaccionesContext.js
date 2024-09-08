import { useEffect, createContext, useState, useContext } from "react";
import {
  getTransacciones,
  postTransaccion,
  postItemsTransaccion,
  patchTransaccion,
} from "../api/transacciones.api";

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

  // Extraer cargarTransacciones fuera del useEffect
  const cargarTransacciones = async () => {
    try {
      const data = await getTransacciones();
      setTransacciones(data);
      console.log("Transacciones cargadas:", data);
    } catch (error) {
      console.error("Error al cargar las transacciones:", error);
    }
  };

  useEffect(() => {
    cargarTransacciones();
  }, []);

  // Función para buscar una transacción por ID
  const getTransaccionPorId = (id) => {
    return transacciones.find((transaccion) => transaccion.idTransaccion == id);
  };

  const postTransaccionContext = async (transaccion) => {
    try {
      console.log("post; ", transaccion);
      const response = await postTransaccion(transaccion);
      console.log("respuesta de postear transaccion",response);
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
      // Recargar transacciones después de la actualización
      await cargarTransacciones();
    } catch (error) {
      console.error("Error al actualizar la transacción:", error);
    }
  };

  const postItemsTransaccionContext = async (idTransaccionItemTransaccion, itemsTransaccion) => {
    if(itemsTransaccion.length === 0) return;
    try {
      const response = await postItemsTransaccion(idTransaccionItemTransaccion, itemsTransaccion);
      console.log("postItemsTransaccionContext: ", response);
      // Recargar transacciones después de la inserción de items
    } catch (error) {
      console.error("Error al crear los items de la transacción:", error);
    }
  };

  return (
    <TransaccionesContext.Provider
      value={{
        transacciones,
        transaccionVacia,
        setTransacciones,
        getTransaccionPorId,
        postTransaccionContext,
        postItemsTransaccionContext,
        patchTransaccionContext,
      }}
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