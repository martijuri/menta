import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CuentasForm from "../forms/CuentasForm";
import { TransaccionesContext } from "../../context/TransaccionesContext.js";

const TransaccionesForm = ({ handleSubmit }) => {
  const { transacciones, getTransaccionPorId } =
    useContext(TransaccionesContext);
  const [transaccion, setTransaccion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (transacciones.length > 0) {
      const transaccionEncontrada = getTransaccionPorId(id);
      console.log(transaccionEncontrada);
      setTransaccion(transaccionEncontrada);
    }
  }, [transacciones, id]);

  if (!transaccion) return <h1>Cargando...</h1>;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(transaccion);
  };

  return (
    <form onSubmit={onSubmit}>
      <CuentasForm
        cuenta={transaccion.cuenta}
        selectCuenta={(newCuenta) =>
          setTransaccion({ ...transaccion, cuenta: newCuenta })
        }
      />
      <input
        type="date"
        value={
          new Date(transaccion.fechaTransaccion).toISOString().split("T")[0]
        }
        onChange={(e) =>
          setTransaccion({ ...transaccion, fechaTransaccion: e.target.value })
        }
      />
      <input
        type="date"
        value={
          transaccion.fechaEntrega
            ? new Date(transaccion.fechaEntrega).toISOString().split("T")[0]
            : null
        }
        onChange={(e) =>
          setTransaccion({ ...transaccion, fechaEntrega: e.target.value })
        }
      />
      <button type="submit" >Submit</button>
    </form>
  );
};

export default TransaccionesForm;
