import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StockForm from "../components/forms/StockForm";
import {
  postItemsTransaccion,
  postTransaccion,
} from "../api/transacciones.api";

const StockFormPage = () => {
  const [stockForms, setStockForms] = useState([
    { id: 1, data: { idMarco: "", cantidad: "" } },
  ]);
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
    try {
      const response = await postTransaccion({
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
        return;
      }

      await postItemsTransaccion({
        idTransaccionItemTransaccion: idTransaccion,
        itemsTransaccion,
      });

      alert("Stock cargado exitosamente");
      navigate("/stock");
    } catch (error) {
      console.error("Error al cargar el stock:", error);
      alert("Hubo un error al cargar el stock");
    }
  };

  return (
    <div>
      <h1>Cargar Stock nuevo</h1>
      {stockForms.map((form) => (
        <StockForm
          key={form.id}
          handleSubmit={(data) => handleFormChange(form.id, data)}
        />
      ))}
      <button onClick={addStockForm}>Agregar otro marco</button>
      <button onClick={handleSubmit}>Cargar Stock</button>
      <button onClick={() => navigate("/stock")}>Cancelar</button>
    </div>
  );
};

export default StockFormPage;