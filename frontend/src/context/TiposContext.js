import { createContext, useState, useEffect, useContext } from "react";
import { getTiposMarcos } from "../api/utils.api";

export const TiposContext = createContext();

export const TiposProvider = ({ children }) => {
  const [tiposDeMarcos, setTiposDeMarcos] = useState([]);
  
  const cargarTiposDeMarcos = async () => {
    try {
      const response = await getTiposMarcos();
      setTiposDeMarcos(response);
      console.log("Tipos de marcos array:", response);
    } catch (error) {
      console.error("Error al cargar los tipos de marcos:", error);
    }
  };

  useEffect(() => {
    cargarTiposDeMarcos();
  }, []);
  
  const getTipoMarco = (id) => {
    return tiposDeMarcos.find((tipo) => tipo.idTipo === id);
  };

  return (
    <TiposContext.Provider value={{ tiposDeMarcos, getTipoMarco }}>
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