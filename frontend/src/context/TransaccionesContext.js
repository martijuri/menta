import { useEffect, createContext, useState } from "react";
import { getTransacciones } from "../api/transacciones.api";

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
    return transacciones.find(transaccion => transaccion.idTransaccion == id);
  };

  return (
    <TransaccionesContext.Provider value={{ transacciones, setTransacciones, getTransaccionPorId }}>
      {children}
    </TransaccionesContext.Provider>
  );
};
