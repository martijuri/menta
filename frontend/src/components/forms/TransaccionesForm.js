import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CuentasForm from "../forms/CuentasForm";
import ItemsForms from "./ItemsForms";
import { useTransacciones } from "../../context/TransaccionesContext.js";

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

  useEffect(() => {
    const fetchTransaccion = async () => {
      if (id === "new") {
        setTransaccion(transaccionVacia);
      } else if (transacciones.length > 0 && transaccion === null) {
        console.log("id ", id);
        const transaccionEncontrada = await getTransaccionPorId(id);
        console.log(transaccionEncontrada);
        setTransaccion(transaccionEncontrada);
        setItems(transaccionEncontrada.itemsTransaccion[0], ...(items || []));
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
    console.log("submit");
    let transaccionId = transaccion.idTransaccion;

    if (id && id !== "new") {
      await patchTransaccionContext(transaccion);
    } else {
      const res = await postTransaccionContext(transaccion);
      if (res && res.id) {
        transaccionId = res.id;
        setTransaccion({ ...transaccion, idTransaccion: res.id });
        console.log("setear idTransaccion:", res.id);
      } else {
        console.error("Error al crear la transacción");
        return;
      }
    }

    console.log("Post items:", nuevosItems);
    if (nuevosItems.length > 0) {
      postItemsTransaccionContext(transaccionId, nuevosItems);
    }

    console.log("Updated items:", updatedItems);
    if (updatedItems.length > 0) {
      for (const item of updatedItems) {
        patchItemTransaccionContext(item.idItemTransaccion, item);
      }
    }

    console.log("Deleted items:", deletedItems);
    for (const item of deletedItems) {
      deleteItemTransaccionContext(item.idItemTransaccion);
    }

    navigate("/pedidos");
  };

  const handleItemsChange = (itemsForms) => {
    setItems(itemsForms.map((form) => form.data));
    console.log("Items:", items);
  };

  const handleItemRemove = (item) => {
    setDeletedItems([...deletedItems, item]);
    console.log("Deleted items:", deletedItems);
  };

  return (
    <div className="scroll-container">
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
        />
        {!transaccion.cuenta ? (
          <p>No hay cuenta asociada. Por favor, seleccione una cuenta.</p>
        ) : (
          <>
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
            />
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
            />
          </>
        )}
        <ItemsForms onFormsChange={handleItemsChange} initialItems={items} onItemRemove={handleItemRemove} />
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