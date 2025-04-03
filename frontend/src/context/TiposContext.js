import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { getTiposMarcos } from "../api/utils.api";

export const TiposContext = createContext();

export const TiposProvider = ({ children }) => {
  const [tiposDeMarcos, setTiposDeMarcos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const cargarTiposDeMarcos = useCallback(async () => {
    try {
      const response = await getTiposMarcos();
      setTiposDeMarcos(response);
      setIsLoaded(true);
      console.log("Tipos de marcos array:", response);
    } catch (error) {
      console.error("Error al cargar los tipos de marcos:", error);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      cargarTiposDeMarcos();
    }
  }, [isLoaded, cargarTiposDeMarcos]);

  const getTipoMarco = (id) => {
    // Check if tiposDeMarcos is loaded, return null if not
    if (!isLoaded) {
      return null;
    }
    return tiposDeMarcos.find((tipo) => tipo.idTipo === id);
  };

  return (
    <TiposContext.Provider value={{ tiposDeMarcos, getTipoMarco, cargarTiposDeMarcos }}>
      {children}
    </TiposContext.Provider>
  );
};

export const useTipos = () => {
  const context = useContext(TiposContext);
  if (!context) {
    throw new Error("useTipos must be used within a TiposProvider");
  }
  return context;
};