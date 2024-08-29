import { OptionsButton } from "../utils/Buttons";
import { formatDate } from "../utils/Formatos";

const VentaCard = ({ venta }) => {
  return (
    <div key={venta.idTransaccion} className="venta-card">
      <h3>
        {venta.idTransaccion} - {venta.fechaTransaccion ? formatDate(venta.fechaTransaccion) : "Fecha no disponible"}
      </h3>
      <p>
        <strong>Cuenta:</strong>{" "}
        {venta.cuenta ? (
          <>
            {venta.cuenta.cuentaNombre || "Nombre no disponible"} -{" "}
            {venta.cuenta.cuentaCuit || "CUIT no disponible"} -{" "}
            {venta.cuenta.cuentaDireccion || "Dirección no disponible"} -{" "}
            {venta.cuenta.cuentaTelefono || "Teléfono no disponible"}
          </>
        ) : (
          "No hay cuenta asociada"
        )}
      </p>
      <p>
        <strong>Items:</strong>
        {venta.itemsTransaccion && venta.itemsTransaccion.length > 0 ? (
          <ul>
            {venta.itemsTransaccion[0].map((item) => (
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
      <OptionsButton id={venta.idTransaccion} type={"venta"} />
    </div>
  );
};

export default VentaCard;