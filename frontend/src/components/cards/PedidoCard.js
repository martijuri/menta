import { OptionsButton } from "../utils/Buttons";

const PedidoCard = ({ pedido }) => {
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
        <OptionsButton id={pedido.idTransaccion} type={'pedido'} />
      </div>
    
  );
};
export default PedidoCard;
