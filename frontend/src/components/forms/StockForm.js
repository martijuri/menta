import { useEffect, useState } from "react";
import { useStock } from "../../context/StockContext";
import { useTipos } from "../../context/TiposContext";
import FiltroInput from "../utils/FiltroInput";
import { postMarco } from "../../api/marcos.api";

const StockForm = ({ handleSubmit }) => {
  const [itemTransaccion, setItemTransaccion] = useState({
    idMarcoItemTransaccion: null,
    cantidadItemTransaccion: 0,
  });
  const [marco, setMarco] = useState(null);
  const { stock} = useStock();
  const [marcos, setMarcos] = useState([]);
  const { tiposDeMarcos, getTipoMarco } = useTipos();
  const [isNuevoMarco, setIsNuevoMarco] = useState(false);
  const [nuevoMarco, setNuevoMarco] = useState({
    idMarco: "",
    idTipoMarco: "",
    stockMarco: 0,
    precioDolar: 0,
  });

  useEffect(() => {
    const ids = stock.map((marco) => marco.idMarco);
    setMarcos(["Nuevo Marco", ...ids]);
  }, [stock]);

  const handleSetMarco = (marcoId) => {
    if (marcoId === "Nuevo Marco") {
      setIsNuevoMarco(true);
      setMarco(null);
      setItemTransaccion((prev) => ({
        ...prev,
        idMarcoItemTransaccion: null,
      }));
    } else {
      setIsNuevoMarco(false);
      const newMarco = stock.find((m) => m.idMarco === marcoId);
      setMarco(newMarco);
      setItemTransaccion((prev) => ({
        ...prev,
        idMarcoItemTransaccion: marcoId,
      }));
      handleSubmit({
        ...itemTransaccion,
        idMarcoItemTransaccion: marcoId,
      });
    }
  };

  const handleCantidadChange = (e) => {
    const cantidad = e.target.value;
    const updatedItemTransaccion = {
      ...itemTransaccion,
      cantidadItemTransaccion: cantidad,
    };
    setItemTransaccion(updatedItemTransaccion);
    handleSubmit(updatedItemTransaccion); // Llamar a handleSubmit automáticamente
  };

  const handleNuevoMarcoChange = (e) => {
    const { name, value } = e.target;
    setNuevoMarco((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNuevoMarcoSubmit = () => {

    postMarco(nuevoMarco);
    handleSubmit({
      ...itemTransaccion,
      idMarcoItemTransaccion: nuevoMarco.idMarco,
    });
  };

  return (
    <div>
      <FiltroInput
        options={marcos}
        placeholder="Seleccione el marco"
        onSelection={handleSetMarco}
        label="Código: "
      />

      {marco && !isNuevoMarco && (
        <div>
          <p>Tipo: {getTipoMarco(marco.idTipoMarco).Tipo }</p>
          <p>Stock actual: {marco.stockMarco}</p>
          <p>Precio unitario en USD: {marco.precioDolar}</p>
          {/* <img src={marco.imagenMarco} alt="Imagen del marco" /> */}
          <button
            onClick={() => {
              /* Lógica para editar el marco */
            }}
          >
            Editar
          </button>
          <input
            type="number"
            placeholder="Cantidad"
            onChange={handleCantidadChange}
          />
        </div>
      )}

      {isNuevoMarco && (
        <div>
          <input
            type="text"
            name="idMarco"
            placeholder="ID del Marco"
            value={nuevoMarco.idMarco}
            onChange={handleNuevoMarcoChange}
          />
          <select
            name="idTipoMarco"
            value={nuevoMarco.idTipoMarco}
            onChange={handleNuevoMarcoChange}
          >
            <option value="">Seleccione el tipo de marco</option>
            {tiposDeMarcos.map((tipo) => (
              <option key={tipo.idTipo} value={tipo.idTipo}>
                {tipo.Tipo}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="stockMarco"
            placeholder="Cantidad"
            value={itemTransaccion.cantidadItemTransaccion}
            onChange={handleCantidadChange}
          />
          <input
            type="number"
            name="precioDolar"
            placeholder="Precio en USD"
            value={nuevoMarco.precioDolar}
            onChange={handleNuevoMarcoChange}
          />
          <button onClick={handleNuevoMarcoSubmit}>Guardar Nuevo Marco</button>
        </div>
      )}
    </div>
  );
};

export default StockForm;
