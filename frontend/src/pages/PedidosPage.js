import TransaccionesList from "../components/lists/TransaccionesList";
import { LinkButton } from "../components/utils/Buttons";

const PedidosPage = () => {
  return (
    <div>
      <h1>Pedidos Page</h1>
      {/* <LinkButton url={`/transacciones/new/edit`}  text="Nuevo Pedido" /> */}
      <br />
      <TransaccionesList type = {"pedidos"} />      
    </div>
  );
};
export default PedidosPage;
