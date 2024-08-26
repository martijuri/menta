import { createContext, useEffect } from "react";
import { useState } from "react";
import { getMarcos } from "../api/marcos.api";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stock, setStock] = useState([]);

    useEffect(() => {
        const cargarStock = async () => {
            try {
                const data = await getMarcos();
                console.log("Stock:", data);
                setStock(data);
            } catch (error) {
                console.error("Error al cargar el stock:", error);
            }
        };
        cargarStock();
    }, []);

  return (
    <StockContext.Provider value={{stock}}>
      {children}
    </StockContext.Provider>
  );
}
