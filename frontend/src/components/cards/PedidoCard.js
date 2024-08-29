import { OptionsButton } from "../utils/Buttons";
import { useContext } from "react";
import { TransaccionContext } from "../../context/TransaccionContext";

const PedidoCard = ({ pedido }) => {
  const { updateTransaccion } = useContext(TransaccionContext);

  return (
    <div key={pedido.idTransaccion} className="pedido-card">
      <h3>
        {pedido.idTransaccion} - {pedido.fechaTransaccion || "Fecha no disponible"}
      </h3>
      <p>
        <strong>Cuenta:</strong>{" "}
        {pedido.cuenta ? (
          <>
            {pedido.cuenta.cuentaNombre || "Nombre no disponible"} -{" "}
            {pedido.cuenta.cuentaCuit || "CUIT no disponible"} -{" "}
            {pedido.cuenta.cuentaDireccion || "Dirección no disponible"} -{" "}
            {pedido.cuenta.cuentaTelefono || "Teléfono no disponible"}
          </>
        ) : (
          "No hay cuenta asociada"
        )}
      </p>
      <p>
        <strong>Items:</strong>
        {pedido.itemsTransaccion && pedido.itemsTransaccion.length > 0 ? (
          <ul>
            {pedido.itemsTransaccion[0].map((item) => (
              <li key={item.idItemTransaccion}>
                {item.idMarcoItemTransaccion || "ID de Marco no disponible"} x
                {item.cantidadItemTransaccion || "Cantidad no disponible"}
              </li>
            ))}
          </ul>
        ) : (
          "No hay items en la transacción"
        )}
      </p>
      <OptionsButton
        id={pedido.idTransaccion}
        type={"pedido"}
        onClick={() => updateTransaccion(pedido)}
      />
    </div>
  );
};

export default PedidoCard;