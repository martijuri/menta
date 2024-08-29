import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";
import {
  deleteTransaccion,
  patchTransaccion,
} from "../../api/transacciones.api";
import { deleteMarco } from "../../api/marcos.api";
import { patchCuenta, postCuenta } from "../../api/utils.api";

// Botones de acción

// Botón que elimina un marco o transacción por id (tipo recibido en props)
export const DeleteButton = ({ id, type, onDelete }) => {
  const handleDelete = async () => {
    try {
      if (type === "marco") {
        const response = await deleteMarco(id);
        console.log(response);
      } else if (type === "venta" || type === "pedido") {
        const response = await deleteTransaccion(id);
        console.log(response);
      }
      if(onDelete){
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
export const LinkButton = ({ url, text}) => {
  return (
    <Link to={url}>
      <button className="link-button">
        {text}
      </button>
    </Link>
  );
};

// Botón que marca una transacción como completada
export const CompleteButton = ({ id }) => {
  const handleComplete = async () => {
    try {
      const newDate = new Date();
      await patchTransaccion(id, {
        fechaEntrega: newDate.toISOString().split("T")[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="complete-button" onClick={handleComplete}>
      Complete
    </button>
  );
};

// Botón que marca una transacción como incompleta
export const IncompleteButton = ({ id }) => {
  const handleIncomplete = async () => {
    try {
      await patchTransaccion(id, { fechaEntrega: null });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="incomplete-button" onClick={handleIncomplete}>
      Incomplete
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
      Print
    </button>
  );
};

// Configuración de botones por tipo
const buttonConfig = {
  // venta: [EditButton, DeleteButton, PrintButton, IncompleteButton],
  // pedido: [EditButton, DeleteButton, PrintButton, CompleteButton],
  // marco: [EditButton, DeleteButton],
  venta: [EditButton],
  pedido: [EditButton],
  marco: [EditButton, DeleteButton],
};

// Botón de opciones que muestra los botones de acción correspondientes al tipo
export const OptionsButton = ({ id, type , onClick}) => {
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
            <ButtonComponent key={index} id={id} type={type} url={"pedidos/form"} text={"to form"} />
          ))}
        </>
      )}
    </>
  );
};


// Botón para confirmar una cuenta
export const ConfirmButton = ({ id }) => {
  const handleConfirm = async () => {
   
  };

  return (
    <button className="confirm-button" onClick={handleConfirm}>
      Confirm
    </button>
  );
};
