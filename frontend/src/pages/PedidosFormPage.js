import TransaccionesForm from "../components/forms/TransaccionesForm";
import { useContext } from "react";
import { TransaccionContext } from "../context/TransaccionContext";

const PedidosFormPage = () => {
  const { transaccion, updateTransaccion } = useContext(TransaccionContext);
  return (
    <div>
      <h1>FormPage</h1>
      <TransaccionesForm
        type={"pedidos"}
        transaccion={transaccion}
        handleSubmit={updateTransaccion}
      />
    </div>
  );
};
export default PedidosFormPage;
