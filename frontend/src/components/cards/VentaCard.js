import { OptionsButton } from "../utils/Buttons";
import { formatDate } from "../utils/Formatos";
import "../../styles/Card.css";

const VentaCard = ({ venta }) => {
  return (
    <div key={venta.idTransaccion} className="venta-card">
      <div className="card-body">
        <h3>
          {venta.fechaTransaccion
            ? formatDate(venta.fechaTransaccion)
            : "Fecha no disponible"}
            -{" "}{venta.cuenta.cuentaNombre || "Cuenta no disponible"} 
        </h3>
        <p>
          {venta.cuenta ? (
            <>
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
      </div>
      <div className="card-footer">
        <OptionsButton id={venta.idTransaccion} type={"venta"} />
      </div>
    </div>
  );
};

export default VentaCard;
