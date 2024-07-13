import { OptionsButton } from "../utils/Buttons";

const VentaCard = ({ venta }) => {
  return (
    <>
      <div key={venta.idTransaccion} className="venta-card">
        <h3>
          {venta.idTransaccion} - {venta.fechaTransaccion}
        </h3>
        <p>
          {venta.cuenta.cuentaNombre} - {venta.cuenta.cuentaCuit} -{" "}
          {venta.cuenta.cuentaDireccion} - {venta.cuenta.cuentaTelefono}
          {venta.itemsTransaccion[0].map((item) => (
            <li key={item.idItemTransaccion}>
              {item.idMarcoItemTransaccion} x{item.cantidadItemTransaccion}{" "}
            </li>
          ))}
        </p>
        <OptionsButton id={venta.idTransaccion} type={'venta'} />
      </div>
    </>
  );
};
export default VentaCard;
