import { OptionsButton } from "../utils/Buttons";

const VentaCard = ({ venta }) => {
  return (
    <>
      <div key={venta.idTransaccion} className="venta-card">
      <h3>
        {venta.idTransaccion} - {venta.fechaTransaccion || "Fecha no disponible"}
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
          {venta.itemsTransaccion[0].map((item) => (
            <li key={item.idItemTransaccion}>
              {item.idMarcoItemTransaccion} x{item.cantidadItemTransaccion}{" "}
            </li>
          ))}
        </p>
        <OptionsButton id={venta.idTransaccion} type={"venta"} />
      </div>
    </>
  );
};
export default VentaCard;
