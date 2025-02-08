import { createContext, useEffect, useState, useCallback } from "react";
import { getCuentas, postCuenta, patchCuenta } from "../api/utils.api";

export const CuentasContext = createContext();

export const CuentasProvider = ({ children }) => {
  const [cuentas, setCuentas] = useState([]);
  const [isCuentasLoaded, setIsCuentasLoaded] = useState(false);

  const cargarCuentas = useCallback(async () => {
    try {
      const data = await getCuentas();
      console.log("Cuentas:", data);
      setCuentas(data);
      setIsCuentasLoaded(true);
    } catch (error) {
      console.error("Error al cargar las cuentas:", error);
    }
  }, []);

  useEffect(() => {
    if (!isCuentasLoaded) {
      cargarCuentas();
    }
  }, [isCuentasLoaded, cargarCuentas]);

  const postCuentaContext = async (cuenta) => {
    try {
      const response = await postCuenta(cuenta);
      setIsCuentasLoaded(false); // Marcar datos como desactualizados
      return response;
    } catch (error) {
      console.error("Error al crear la cuenta:", error);
    }
  };

  const patchCuentaContext = async (cuenta) => {
    try {
      const response = await patchCuenta(cuenta.idCuenta, cuenta);
      setIsCuentasLoaded(false); // Marcar datos como desactualizados
      return response;
    } catch (error) {
      console.error("Error al actualizar la cuenta:", error);
    }
  };

  return (
    <CuentasContext.Provider value={{ cuentas, setCuentas, postCuentaContext, patchCuentaContext }}>
      {children}
    </CuentasContext.Provider>
  );
};