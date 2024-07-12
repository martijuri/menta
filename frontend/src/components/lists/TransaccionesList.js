import { useState, useEffect } from "react";
import { getPedidos, getVentas } from "../../api/transacciones.api";
import PedidoCard from "../cards/PedidoCard";
import VentaCard from "../cards/VentaCard";
import SearchBar from "../utils/SearchBar";

const TransaccionesList = ({ type }) => {
  const [transacciones, setTransacciones] = useState([]);
  useEffect(() => {
    async function loadTransacciones() {
      try {
        if (type === "pedidos") {
          const response = await getPedidos();
          setTransacciones(response);
        } else if (type === "ventas") {
          const response = await getVentas();
          setTransacciones(response);
        } else {
          const response = [];
          setTransacciones(response);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadTransacciones();
  });
  return (
    <>
      <SearchBar />
      {type === "pedidos" &&
        transacciones.map((pedido) => (
          <PedidoCard key={pedido.idTransaccion} pedido={pedido} />
        ))}
      {type === "ventas" &&
        transacciones.map((venta) => (
          <VentaCard key={venta.idTransaccion} venta={venta} />
        ))}
    </>
  );
};

export default TransaccionesList;
