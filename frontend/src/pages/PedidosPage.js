import TransaccionesList from "../components/lists/TransaccionesList";
import { LinkButton } from "../components/utils/Buttons";
import "../styles/PedidosPage.css";

const PedidosPage = () => {
  return (
    <div className="pedidos-page-container">
      <LinkButton url={`/transacciones/new/edit`} text="Nuevo Pedido" />
      <TransaccionesList type={"pedidos"} />
    </div>
  );
};

export default PedidosPage;
