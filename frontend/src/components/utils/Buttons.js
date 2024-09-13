import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteMarco } from "../../api/marcos.api";
import { useTransacciones } from "../../context/TransaccionesContext";

// Botones de acción

// Botón que elimina un marco o transacción por id (tipo recibido en props)
export const DeleteButton = ({ id, type, onDelete }) => {
  const { deleteTransaccionContext } = useTransacciones();
  const handleDelete = async () => {
    try {
      if (type === "marco") {
        const response = await deleteMarco(id);
        console.log(response);
      } else if (type === "venta" || type === "pedido") {
        await deleteTransaccionContext(id);
      }
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      Eliminar
    </button>
  );
};

export const EditButton = ({ id, type }) => {
  let navigate = useNavigate(); // Hook para navegar

  const handleEdit = () => {
    if (type === "marco") {
      navigate(`/marcos/${id}/edit`);
    } else if (type === "venta" || type === "pedido") {
      navigate(`/transacciones/${id}/edit`);
    }
  };

  return (
    <button className="edit-button" onClick={handleEdit}>
      Edit
    </button>
  );
};

// Botón que redirige a una URL específica pasada como prop
export const LinkButton = ({ url, text }) => {
  return (
    <Link to={url}>
      <button className="link-button">{text}</button>
    </Link>
  );
};

// Botón que marca una transacción como completada
export const CompleteButton = ({ id }) => {
  const { patchTransaccionContext, getTransaccionPorId } = useTransacciones();
  const handleComplete = async () => {
    try {
      const newDate = new Date();
      const transaccion = await getTransaccionPorId(id);
      if (transaccion) {
        await patchTransaccionContext({
          ...transaccion,
          fechaEntrega: newDate.toISOString().split("T")[0],
        });
      } else {
        console.log(`Transacción con id ${id} no encontrada.`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="complete-button" onClick={handleComplete}>
      Entregar
    </button>
  );
};

// Botón que marca una transacción como incompleta
export const IncompleteButton = ({ id }) => {
  const { patchTransaccionContext, getTransaccionPorId } = useTransacciones();
  const handleIncomplete = async () => {
    try {
      const transaccion = await getTransaccionPorId(id);
      await patchTransaccionContext({ ...transaccion, fechaEntrega: null });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="incomplete-button" onClick={handleIncomplete}>
      Regresar a pedidos
    </button>
  );
};

// Botón que imprime una transacción
export const PrintButton = ({ id }) => {
  const handlePrint = async () => {
    return (
      <>
        <Link to={`/transacciones/${id}/print`} />;
      </>
    );
  };

  return (
    <button className="print-button" onClick={handlePrint}>
      Imprimir
    </button>
  );
};

// Configuración de botones por tipo
const buttonConfig = {
  // venta: [EditButton, DeleteButton, PrintButton, IncompleteButton],
  // pedido: [EditButton, DeleteButton, PrintButton, CompleteButton],
  // marco: [EditButton, DeleteButton],
  venta: [DeleteButton],
  pedido: [EditButton, DeleteButton, CompleteButton],
  marco: [EditButton, DeleteButton],
};

// Botón de opciones que muestra los botones de acción correspondientes al tipo
export const OptionsButton = ({ id, type }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Obtencion de botones por tipo
  const ButtonComponents = buttonConfig[type] || [];

  return (
    <>
      <button className="options-button" onClick={handleOptions}>
        Options
      </button>
      {showOptions && (
        <>
          {ButtonComponents.map((ButtonComponent, index) => (
            // Renderiza cada botón con el id proporcionado y el tipo correspondiente
            <ButtonComponent
              key={index}
              id={id}
              type={type}
              url={"pedidos/form"}
              text={"to form"}
            />
          ))}
        </>
      )}
    </>
  );
};

// Botón para confirmar una cuenta
export const ConfirmButton = ({ id }) => {
  const handleConfirm = async () => {};

  return (
    <button className="confirm-button" onClick={handleConfirm}>
      Confirm
    </button>
  );
};
