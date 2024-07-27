import { OptionsButton } from "../utils/Buttons";
import { useContext } from "react";
import { TransaccionContext } from "../../context/TransaccionContext";

const PedidoCard = ({ pedido }) => {
  const { updateTransaccion } = useContext(TransaccionContext);
  
  return (
    
      <div key={pedido.idTransaccion} className="pedido-card">
        <h3>
          {pedido.idTransaccion} - {pedido.fechaTransaccion}
        </h3>
        <p>
          {pedido.cuenta.cuentaNombre} - {pedido.cuenta.cuentaCuit} -{" "}
          {pedido.cuenta.cuentaDireccion} - {pedido.cuenta.cuentaTelefono} -
          {pedido.itemsTransaccion[0].map((item) => ( <li key={item.idItemTransaccion}>{item.idMarcoItemTransaccion} x{item.cantidadItemTransaccion} </li>))}
       </p>
        <OptionsButton id={pedido.idTransaccion} type={'pedido'} onClick={() => updateTransaccion(pedido)}  />
      </div>
    
  );
};
export default PedidoCard;
