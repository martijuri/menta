import { createContext, useEffect, useState } from "react";
import { getCuentas, postCuenta, patchCuenta } from "../api/utils.api";

export const CuentasContext = createContext();

export const CuentasProvider = ({ children }) => {
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    const cargarCuentas = async () => {
      try {
        const data = await getCuentas();
        console.log("Cuentas:", data);
        setCuentas(data);
      } catch (error) {
        console.error("Error al cargar las cuentas:", error);
      }
    };
 
    cargarCuentas();
  }
  , []);

  return (
    <CuentasContext.Provider value={{ cuentas, setCuentas }}>
      {children}
    </CuentasContext.Provider>
  );
};

export const postCuentaContext = async (cuenta) => {
  try {
    console.log("cuenta desde contexto:", cuenta);
    const response = await postCuenta(cuenta);
    console.log(response);
  } catch (error) {
    console.error("Error al crear la cuenta:", error);
  }
}

export const patchCuentaContext = async (cuenta) => {
  try {
    console.log("cuenta patch",cuenta);
    const response = await patchCuenta(cuenta);
    console.log(response);
  } catch (error) {
    console.error("Error al actualizar la cuenta:", error);
  }
}
