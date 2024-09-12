import { OptionsButton } from "../utils/Buttons";
import { formatDate } from "../utils/Formatos";

const PedidoCard = ({ pedido }) => {

  return (
    <div key={pedido.idTransaccion} className="pedido-card">
      <h3>
        {pedido.fechaTransaccion ? formatDate(pedido.fechaTransaccion) : "Fecha no disponible"} -{" "}
        {pedido.cuenta.cuentaNombre || "Nombre no disponible"} 
      </h3>
      <p>
        {pedido.itemsTransaccion && pedido.itemsTransaccion.length > 0 ? (
          <ul>
            <strong>Pedido:</strong>
            {pedido.itemsTransaccion[0].map((item) => (
              <li key={item.idItemTransaccion}>
                {item.idMarcoItemTransaccion || "ID de Marco no disponible"} x
                {item.cantidadItemTransaccion || "Cantidad no disponible"}
              </li>
            ))}
          </ul>
        ) : (
          "No hay articulos para mostrar"
        )}
      </p>
      <OptionsButton
        id={pedido.idTransaccion}
        type={"pedido"}
      />
    </div>
  );
};

export default PedidoCard;