import React from "react";
import TransaccionesList from "../components/TransaccionesList";

const PedidosPage = () => {
  return (
    <div>
      <h1>Pedidos Page</h1>
      <TransaccionesList type = {"pedidos"} />      
    </div>
  );
};
export default PedidosPage;
