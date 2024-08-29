import React, { createContext, useState, useEffect } from "react";

export const TransaccionContext = createContext();

export const TransaccionProvider = ({ children }) => {
  const [transaccion, setTransaccion] = useState(null);

  const updateTransaccion = (data) => {
    setTransaccion(data);
  };

  // Este efecto se ejecutará cada vez que `transaccion` cambie.
  useEffect(() => {
    if (transaccion) {
      console.log(
        "Transaccion actualizada " + transaccion.idTransaccion + " con ",
        transaccion
      );
    }
  }, [transaccion]); // Asegúrate de incluir `transaccion` en el array de dependencias

  return (
    <TransaccionContext.Provider value={{ transaccion, updateTransaccion }}>
      {children}
    </TransaccionContext.Provider>
  );
};
