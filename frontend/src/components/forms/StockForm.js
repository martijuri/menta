import { useEffect, useState } from "react";
import { useStock } from "../../context/StockContext";
import { useTipos } from "../../context/TiposContext";
import FiltroInput from "../utils/FiltroInput";

const StockForm = ({ handleSubmit }) => {
  const [itemTransaccion, setItemTransaccion] = useState({
    idMarcoItemTransaccion: null,
    cantidadItemTransaccion: 0,
  });
  const [marco, setMarco] = useState(null);
  const { stock, postStock } = useStock();
  const [marcos, setMarcos] = useState([]);
  const { tiposDeMarcos, getTipoMarco } = useTipos();
  const [isNuevoMarco, setIsNuevoMarco] = useState(false);
  const [nuevoMarco, setNuevoMarco] = useState({
    idMarco: "",
    idTipoMarco: "",
    stockMarco: 0,
    precioDolar: 0,
  });
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

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

  const handleNuevoMarcoSubmit = async () => {
    setIsLoading(true);
    try {
      const createdMarco = await postStock(nuevoMarco);

      // Actualizar la lista de marcos
      setMarcos((prevMarcos) => ["Nuevo Marco", ...prevMarcos, createdMarco.idMarco]);

      // Restablecer el estado
      setIsNuevoMarco(false);
      setItemTransaccion({
        idMarcoItemTransaccion: createdMarco.idMarco,
        cantidadItemTransaccion: 0,
      });
      setNuevoMarco({
        idMarco: "",
        idTipoMarco: "",
        stockMarco: 0,
        precioDolar: 0,
      });
      handleSubmit({
        ...itemTransaccion,
        idMarcoItemTransaccion: createdMarco.idMarco,
      });
    } catch (error) {
      console.error("Error al crear el nuevo marco:", error);
      alert("Hubo un error al crear el nuevo marco");
    } finally {
      setIsLoading(false); // Finalizar la carga
    }
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
        <div className="container">
          <div className="subcontainer">
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
          </div>
          <div className="subcontainer">
          <label>Nuevo stock</label>
          <input
            type="number"
            name="stockMarco"
            placeholder="Cantidad"
            value={itemTransaccion.cantidadItemTransaccion}
            onChange={handleCantidadChange}
          />
          </div>
          <div className="subcontainer">
          <label>Precio en USD</label>
          <input
            type="number"
            name="precioDolar"
            placeholder="Precio en USD"
            value={nuevoMarco.precioDolar}
            onChange={handleNuevoMarcoChange}
          />
          </div>
          <button className="submit-button" onClick={handleNuevoMarcoSubmit} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar nuevo marco"}
          </button>
        </div>
      )}
    </div>
  );
};

export default StockForm;