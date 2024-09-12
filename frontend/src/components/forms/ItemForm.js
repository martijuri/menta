import { useEffect, useState } from "react";
import { useStock } from "../../context/StockContext";
import FiltroInput from "../utils/FiltroInput";

const ItemForm = ({ id, data, handleChange, onRemove }) => {
  const { stock } = useStock();
  const marcos = stock.map((marco) => marco.idMarco);
  const [cantidad, setCantidad] = useState(data.cantidadItemTransaccion);
  const [option, setOption] = useState(data.idMarcoItemTransaccion);

  const marco = stock.find((marco) => marco.idMarco === option);

  useEffect(() => {
    handleChange(id, { ...data, cantidadItemTransaccion: cantidad, idMarcoItemTransaccion: option });
  }, [cantidad, option]);

  const handleFilterChange = (option) => {
    setOption(option);
  };

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  return (
    <div>
      <FiltroInput
        options={marcos}
        placeholder={
          data.idMarcoItemTransaccion
            ? data.idMarcoItemTransaccion
            : "Seleccione el marco"
        }
        onSelection={handleFilterChange}
        label="Código: "
      />
      <input
        type="number"
        value={cantidad}
        onChange={handleCantidadChange}
      />
      <h5>Stock disponible: {marco ? marco.stockMarco : ''}</h5>
      <h5>Reservados: {marco ? marco.reservados : ''}</h5>
      <button type="button" onClick={() => onRemove(id)}>
        🗑️
      </button>
    </div>
  );
};

export default ItemForm;