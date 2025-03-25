import { useEffect, useState } from "react";
import { useStock } from "../../context/StockContext";
import { useTipos } from "../../context/TiposContext";
import FiltroInput from "../utils/FiltroInput";
import "../../styles/Stock.css";

const StockForm = ({ handleSubmit, disabled }) => {
  const [formState, setFormState] = useState({
    idMarcoItemTransaccion: null,
    cantidadItemTransaccion: 0,
    idMarco: "",
    idTipoMarco: "",
    stockMarco: 0,
    precioDolar: 0,
  });
  const [errors, setErrors] = useState({});
  const [marco, setMarco] = useState(null);
  const { stock } = useStock();
  const [marcos, setMarcos] = useState([]);
  const { tiposDeMarcos, getTipoMarco } = useTipos();
  const [isNuevoMarco, setIsNuevoMarco] = useState(false);

  useEffect(() => {
    const ids = stock.map((marco) => marco.idMarco);
    setMarcos(["Nuevo Marco", ...ids]);
  }, [stock]);

  const handleSetMarco = (marcoId) => {
    if (marcoId === "Nuevo Marco") {
      setIsNuevoMarco(true);
      setMarco(null);
      setFormState((prev) => ({
        ...prev,
        idMarcoItemTransaccion: null,
      }));
    } else {
      setIsNuevoMarco(false);
      const newMarco = stock.find((m) => m.idMarco === marcoId);
      setMarco(newMarco);
      setFormState((prev) => ({
        ...prev,
        idMarcoItemTransaccion: marcoId,
      }));
    }
  };

  const validate = (name, value) => {
    let error = "";
    if (name === "cantidadItemTransaccion" || name === "precioDolar") {
      if (value <= 0) {
        error = "Debe ser mayor que 0";
      }
    } else if (name === "idMarco") {
      if (stock.some((marco) => marco.idMarco === value)) {
        error = "Este código ya existe";
      }
    } else if (name === "idTipoMarco" && value === "") {
      error = "Debe seleccionar un tipo de marco";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    handleSubmit({ ...formState, [name]: value });
  };

  return (
    <div className="stock-form">
      <FiltroInput
        options={marcos}
        placeholder="Seleccione el marco"
        onSelection={handleSetMarco}
        label="Código: "
        disabled={disabled}
      />

      {marco && !isNuevoMarco && (
        <div className="marco-info">
          <p>Tipo: {getTipoMarco(marco.idTipoMarco).Tipo}</p>
          <p>Stock actual: {marco.stockMarco}</p>
          <p>Precio unitario en USD: {marco.precioDolar}</p>
          <input
            type="number"
            name="cantidadItemTransaccion"
            placeholder="Cantidad"
            value={formState.cantidadItemTransaccion}
            onChange={handleInputChange}
            className={errors.cantidadItemTransaccion ? "error" : ""}
            disabled={disabled}
          />
          {errors.cantidadItemTransaccion && (
            <span className="error-message">{errors.cantidadItemTransaccion}</span>
          )}
        </div>
      )}

      {isNuevoMarco && (
        <div className="container">
          <div className="subcontainer">
            <label>ID del Marco</label>
            <input
              type="text"
              name="idMarco"
              placeholder="ID del Marco"
              value={formState.idMarco}
              onChange={handleInputChange}
              className={errors.idMarco ? "error" : ""}
              disabled={disabled}
            />
            {errors.idMarco && (
              <span className="error-message">{errors.idMarco}</span>
            )}
            <label>Tipo de Marco</label>
            <select
              name="idTipoMarco"
              value={formState.idTipoMarco}
              onChange={handleInputChange}
              className={errors.idTipoMarco ? "error" : ""}
              disabled={disabled}
            >
              <option value="">Seleccione el tipo de marco</option>
              {tiposDeMarcos.map((tipo) => (
                <option key={tipo.idTipo} value={tipo.idTipo}>
                  {tipo.Tipo}
                </option>
              ))}
            </select>
            {errors.idTipoMarco && (
              <span className="error-message">{errors.idTipoMarco}</span>
            )}
          </div>
          <div className="subcontainer">
            <label>Nuevo stock</label>
            <input
              type="number"
              name="cantidadItemTransaccion"
              placeholder="Cantidad"
              value={formState.cantidadItemTransaccion}
              onChange={handleInputChange}
              className={errors.cantidadItemTransaccion ? "error" : ""}
              disabled={disabled}
            />
            {errors.cantidadItemTransaccion && (
              <span className="error-message">{errors.cantidadItemTransaccion}</span>
            )}
          </div>
          <div className="subcontainer">
            <label>Precio en USD</label>
            <input
              type="number"
              name="precioDolar"
              placeholder="Precio en USD"
              value={formState.precioDolar}
              onChange={handleInputChange}
              className={errors.precioDolar ? "error" : ""}
              disabled={disabled}
            />
            {errors.precioDolar && (
              <span className="error-message">{errors.precioDolar}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockForm;