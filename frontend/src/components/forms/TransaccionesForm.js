import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CuentasForm from "../forms/CuentasForm";
import ItemsForms from "./ItemsForms";
import { useTransacciones } from "../../context/TransaccionesContext.js";
import '../../styles/TransaccionesForm.css';

const TransaccionesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    transacciones,
    transaccionVacia,
    getTransaccionPorId,
    postTransaccionContext,
    patchTransaccionContext,
    postItemsTransaccionContext,
    patchItemTransaccionContext,
    deleteItemTransaccionContext,
  } = useTransacciones();
  const [transaccion, setTransaccion] = useState(null);
  const [items, setItems] = useState([]);
  const [nuevosItems, setNuevosItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [updatedItems, setUpdatedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga

  useEffect(() => {
    const fetchTransaccion = async () => {
      if (id === "new") {
        setTransaccion(transaccionVacia);
      } else if (transacciones.length > 0 && transaccion === null) {
        const transaccionEncontrada = await getTransaccionPorId(id);
        setTransaccion(transaccionEncontrada);
        setItems(transaccionEncontrada.itemsTransaccion, ...(items || []));
      }
    };

    fetchTransaccion();
  }, [id]);

  useEffect(() => {
    setNuevosItems(items.filter((item) => !item.idItemTransaccion));
    setUpdatedItems(items.filter((item) => item.idItemTransaccion));
  }, [items]);

  if (!transaccion) return <h1>Cargando...</h1>;

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Iniciar la carga
    let transaccionId = transaccion.idTransaccion;

    try {
      if (id && id !== "new") {
        await patchTransaccionContext(transaccion);
      } else {
        const res = await postTransaccionContext(transaccion);
        if (res && res.id) {
          transaccionId = res.id;
          setTransaccion({ ...transaccion, idTransaccion: res.id });
        } else {
          console.error("Error al crear la transacción");
          setIsLoading(false); // Finalizar la carga en caso de error
          return;
        }
      }

      if (nuevosItems.length > 0) {
        await postItemsTransaccionContext(transaccionId, nuevosItems);
      }

      if (updatedItems.length > 0) {
        for (const item of updatedItems) {
          await patchItemTransaccionContext(item.idItemTransaccion, item);
        }
      }

      for (const item of deletedItems) {
        await deleteItemTransaccionContext(item.idItemTransaccion);
      }

      navigate("/pedidos");
    } catch (error) {
      console.error("Error al procesar la transacción:", error);
      alert("Hubo un error al procesar la transacción");
    } finally {
      setIsLoading(false); // Finalizar la carga
    }
  };

  const handleItemsChange = (itemsForms) => {
    setItems(itemsForms.map((form) => form.data));
  };

  const handleItemRemove = (item) => {
    setDeletedItems([...deletedItems, item]);
  };

  const handleCancel = () => {
    navigate("/pedidos");
  };

  return (
      <form className="transacciones-form" onSubmit={onSubmit}>
        <CuentasForm
          cuenta={transaccion.cuenta}
          selectCuenta={(newCuenta) =>
            setTransaccion({
              ...transaccion,
              cuenta: newCuenta,
              idCuentaTransaccion: newCuenta.idCuenta,
            })
          }
          disabled={isLoading} // Deshabilitar inputs de CuentasForm
        />
        {!transaccion.cuenta ? (
          <p>No hay cuenta asociada. Por favor, seleccione una cuenta.</p>
        ) : (
          <div className="fechas-form">
            <div>
            <label>Fecha del Pedido:</label>
            <input
              type="date"
              value={
                new Date(transaccion.fechaTransaccion)
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setTransaccion({
                  ...transaccion,
                  fechaTransaccion: e.target.value,
                })
              }
              disabled={isLoading} // Deshabilitar input
            />
            </div>
            <div>
            <label>Fecha de Entrega:</label>
            <input
              type="date"
              value={
                transaccion.fechaEntrega
                  ? new Date(transaccion.fechaEntrega)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setTransaccion({ ...transaccion, fechaEntrega: e.target.value })
              }
              disabled={isLoading} // Deshabilitar input
            />
            </div>
          </div>
        )}
        <ItemsForms
          onFormsChange={handleItemsChange}
          initialItems={items}
          onItemRemove={handleItemRemove}
          disabled={isLoading} // Deshabilitar inputs de ItemsForms
        />
        <div className="buttons-container">
        <button
          className="cancel-button"
          type="button"
          onClick={handleCancel}
          disabled={isLoading} // Deshabilitar botón
        >
          Cancelar
        </button>
        <button
          className="submit-button"
          type="submit"
          disabled={!transaccion.cuenta || isLoading} // Deshabilitar botón
        >
          Confirmar
        </button>
        </div>
      </form>
  );
};

export default TransaccionesForm;