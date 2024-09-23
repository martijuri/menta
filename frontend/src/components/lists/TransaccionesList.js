import { useTransacciones } from "../../context/TransaccionesContext";
import PedidoCard from "../cards/PedidoCard";
import VentaCard from "../cards/VentaCard";


const TransaccionesList = ({ type }) => {
  const { transacciones} = useTransacciones();

    return (
    <div className="cards-container">
      {type === "pedidos" &&
        transacciones
          .filter((transaccion) => transaccion.fechaEntrega === null && transaccion.ventaTransaccion === 1)
          .map((pedido) => (
            <PedidoCard key={pedido.idTransaccion} pedido={pedido} />
          ))}
      {type === "ventas" &&
        transacciones
          .filter((transaccion) => transaccion.ventaTransaccion === 1 && transaccion.fechaEntrega !== null)
          .map((venta) => (
            <VentaCard key={venta.idTransaccion} venta={venta} />
          ))}
    </div>
  );
};

export default TransaccionesList;