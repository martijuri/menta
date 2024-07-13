import { createContext, useState, useEffect } from "react";
import { getTiposMarcos } from "../api/utils.api";

export const TiposContext = createContext();

export const TiposProvider = ({ children }) => {
  const [tiposDeMarcos, setTiposDeMarcos] = useState([]);

  useEffect(() => {
    const cargarTiposDeMarcos = async () => {
      try {
        const response = await getTiposMarcos();
        const tiposDeMarcosArray = Object.entries(response).map(
          ([key, value]) => [value.idTipo, value.Tipo]
        );
        setTiposDeMarcos(tiposDeMarcosArray);
        console.log("Tipos de marcos array:", tiposDeMarcosArray);
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
