import { useEffect, useState } from "react";
import { useStock } from "../../context/StockContext";
import FiltroInput from "../utils/FiltroInput";

const ItemForm = ({ id, data, handleChange }) => {
  const { stock } = useStock();
  const marcos = stock.map((marco) => marco.idMarco);
  const [cantidad, setCantidad] = useState(data.cantidadItemTransaccion);
  const [option, setOption] = useState(data.idMarcoItemTransaccion);

  useEffect(() => {
    handleChange(id, { ...data, cantidadItemTransaccion: cantidad, idMarcoItemTransaccion: option });
  }, [cantidad, option, data, handleChange, id]);

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
    </div>
  );
};

export default ItemForm;