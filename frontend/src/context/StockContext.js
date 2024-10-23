import { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { getMarcos, deleteMarco, patchMarco, postMarco } from "../api/marcos.api";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);

  const cargarStock = async () => {
    try {
      const data = await getMarcos();
      console.log("Stock:", data);
      setStock(data);
    } catch (error) {
      console.error("Error al cargar el stock:", error);
    }
  };
  useEffect(() => {
    cargarStock();
  }, []);

  const postStock = async (data) => {
    try {
      await postMarco(data);
      cargarStock();
      return data;
    } catch (error) {
      console.error("Error al crear el marco:", error);
    }
  }

  const deleteStock = async (id) => {
    try {
      await deleteMarco(id);
      cargarStock();
    } catch (error) {
      console.error("Error al eliminar el marco:", error);
    }
  };

  const updateStock = async (id, data) => {
    try {
      await patchMarco(id, data);
      cargarStock();
    } catch (error) {
      console.error("Error al actualizar el marco:", error);
    }
  };


  return (
    <StockContext.Provider value={{ stock, cargarStock, deleteStock, updateStock, postStock }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
};
