import { createContext, useState, useEffect } from "react";
import { getTiposMarcos } from "../api/utils.api";

export const TiposContext = createContext();

export const TiposProvider = ({ children }) => {
  const [tiposDeMarcos, setTiposDeMarcos] = useState([]);

  useEffect(() => {
    const cargarTiposDeMarcos = async () => {
      try {
        const response = await getTiposMarcos();
        setTiposDeMarcos(response);
        console.log("Tipos de marcos array:", response);
      } catch (error) {
        console.error("Error al cargar los tipos de marcos:", error);
      }
    };

    cargarTiposDeMarcos();
  }, []);

  return (
    <TiposContext.Provider value={{ tiposDeMarcos }}>
      {children}
    </TiposContext.Provider>
  );
};
