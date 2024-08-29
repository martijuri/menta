import { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { getMarcos } from "../api/marcos.api";

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

  return (
    <StockContext.Provider value={{stock, cargarStock}}>
      {children}
    </StockContext.Provider>
  );
}

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
};