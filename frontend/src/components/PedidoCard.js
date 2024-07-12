import { EditButton, DeleteButton, PrintButton, CompleteButton } from "./Buttons";

const PedidoCard = ({ pedido }) => {
  return (
    <>
      <div key={pedido.idTransaccion}>
        <h3>
          {pedido.idTransaccion} - {pedido.fechaTransaccion}
        </h3>
        <p>
          {pedido.cuenta.cuentaNombre} - {pedido.cuenta.cuentaCuit} -{" "}
          {pedido.cuenta.cuentaDireccion} - {pedido.cuenta.cuentaTelefono} -
          {pedido.itemsTransaccion[0].map((item) => ( <li key={item.idItemTransaccion}>{item.idMarcoItemTransaccion} x{item.cantidadItemTransaccion} </li>))}
       </p>
        <EditButton id={pedido.idTransaccion} />
        <DeleteButton id={pedido.idTransaccion} />
        <PrintButton id={pedido.idTransaccion} />
        <CompleteButton id={pedido.idTransaccion} />
      </div>
    </>
  );
};
export default PedidoCard;
