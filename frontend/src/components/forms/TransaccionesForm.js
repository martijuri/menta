import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CuentasForm from "../forms/CuentasForm";
import ItemsForms from "./ItemsForms";
import { useTransacciones } from "../../context/TransaccionesContext.js";
import { useItemsTransaccion } from "../../context/ItemsTransaccionContext.js";

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
  } = useTransacciones();
  const [transaccion, setTransaccion] = useState(null);
  const [items, setItems] = useState([]);
  const { patchItemTransaccionContext, deleteItemTransaccionContext } =
    useItemsTransaccion();
  const [nuevosItems, setNuevosItems] = useState([]);
  const [deletedItems] = useState([]);
  const [updatedItems, setUpdatedItems] = useState([]);


  useEffect(() => {
    if (id === "new") {
      setTransaccion(transaccionVacia);
    } else if (transacciones.length > 0 && transaccion === null) {
      console.log("id ",id)
      const transaccionEncontrada = getTransaccionPorId(id);
      console.log(transaccionEncontrada);
      setTransaccion(transaccionEncontrada);
      setItems(transaccionEncontrada.itemsTransaccion[0], ...(items || []));
    }
  }, [id]);

  useEffect(() => {
    setNuevosItems(items.filter((item) => !item.idItemTransaccion));
    setUpdatedItems(items.filter((item) => item.idItemTransaccion));
  }, [items]);

  if (!transaccion) return <h1>Cargando...</h1>;

    const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    if (id && id !== "new") {
      await patchTransaccionContext(transaccion);
    } else {
      const res = await postTransaccionContext(transaccion);
      console.log("respuesta de postear transaccion:", res);
      if (res && res.id) {
        setTransaccion({ ...transaccion, idTransaccion: res.id });
      } else {
        console.error("Error al crear la transacción");
        return;
      }
    }
    if (nuevosItems.length > 0) {
      postItemsTransaccionContext(transaccion.idTransaccion, nuevosItems);
      console.log("Post items:", nuevosItems);
    }
    if (updatedItems.length > 0) {
      for (const item of updatedItems) {
        patchItemTransaccionContext(item.idItemTransaccion, item);
        console.log("Updated item:", item);
      }
    }
  
    for (const item of deletedItems) {
      deleteItemTransaccionContext(transaccion.idTransaccion, item);
    }
    navigate("/pedidos");
  };

  const handleItemsChange = (itemsForms) => {
    setItems(itemsForms.map((form) => form.data));
    console.log("Items:", items);
  };

  return (
    <div className="scroll-container">
      <form className="transacciones-form" onSubmit={onSubmit}>
        <CuentasForm
          cuenta={transaccion.cuenta}
          selectCuenta={(newCuenta) =>
            setTransaccion({ ...transaccion, cuenta: newCuenta, idCuentaTransaccion: newCuenta.idCuenta })
          }
        />
        {!transaccion.cuenta ? (
          <p>No hay cuenta asociada. Por favor, seleccione una cuenta.</p>
        ) : (
          <>
            <input
              type="date"
              value={
                new Date(transaccion.fechaTransaccion).toISOString().split("T")[0]
              }
              onChange={(e) =>
                setTransaccion({
                  ...transaccion,
                  fechaTransaccion: e.target.value,
                })
              }
            />
            <input
              type="date"
              value={
                transaccion.fechaEntrega
                  ? new Date(transaccion.fechaEntrega).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setTransaccion({ ...transaccion, fechaEntrega: e.target.value })
              }
            />
          </>
        )}
        <ItemsForms onFormsChange={handleItemsChange} initialItems={items} />
        <button
          className="submit-button"
          type="submit"
          disabled={!transaccion.cuenta}
        >
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default TransaccionesForm;