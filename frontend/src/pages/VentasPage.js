import React from "react";
import TransaccionesList from "../components/TransaccionesList";

const VentasPage = () => {
  return (
    <div>
      <h1>Ventas Page</h1>
      <TransaccionesList type = {"ventas"} />      
    </div>
  );
};
export default VentasPage;
