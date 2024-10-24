import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StockForm from "../components/forms/StockForm";
import { useTransacciones } from "../context/TransaccionesContext";
import "../styles/Stock.css";

const StockFormPage = () => {
  const [stockForms, setStockForms] = useState([
    { id: 1, data: { idMarco: "", cantidad: "" } },
  ]);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga
  const { postTransaccionContext, postItemsTransaccionContext } =
    useTransacciones();
  const navigate = useNavigate();

  const addStockForm = () => {
    setStockForms([
      ...stockForms,
      { id: stockForms.length + 1, data: { idMarco: "", cantidad: "" } },
    ]);
  };

  const handleFormChange = (id, data) => {
    setStockForms(
      stockForms.map((form) => (form.id === id ? { ...form, data } : form))
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Iniciar la carga
    try {
      const response = await postTransaccionContext({
        ventaTransaccion: 0,
        idCuentaTransaccion: null,
        fechaTransaccion: new Date().toISOString(),
      });

      const idTransaccion = response.id;

      const itemsTransaccion = stockForms
        .filter(
          (form) =>
            form.data.idMarcoItemTransaccion &&
            form.data.cantidadItemTransaccion
        ) // Filtrar formularios vacíos
        .map((form) => ({
          idMarcoItemTransaccion: form.data.idMarcoItemTransaccion,
          cantidadItemTransaccion: form.data.cantidadItemTransaccion,
        }));

      if (itemsTransaccion.length === 0) {
        alert("No hay datos válidos para enviar");
        setIsLoading(false); // Finalizar la carga
        return;
      }

      await postItemsTransaccionContext(idTransaccion, itemsTransaccion);

      alert("Stock cargado exitosamente");
      navigate("/stock");
    } catch (error) {
      console.error("Error al cargar el stock:", error);
      alert("Hubo un error al cargar el stock");
    } finally {
      setIsLoading(false); // Finalizar la carga
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Cargar stock</h1>
        {stockForms.map((form) => (
          <StockForm
            key={form.id}
            handleSubmit={(data) => handleFormChange(form.id, data)}
            disabled={isLoading} 
          />
        ))}
        <button
          className="new-item-button"
          onClick={addStockForm}
          disabled={isLoading}
        >
          Agregar otro marco
        </button>
      </div>
      <div className="buttons-container">
        <button
          className="cancel-button"
          onClick={() => navigate("/stock")}
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          className="edit-button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Cargar Stock
        </button>
      </div>
    </div>
  );
};

export default StockFormPage;
