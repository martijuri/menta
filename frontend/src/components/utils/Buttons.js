import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTransacciones } from "../../context/TransaccionesContext";
import { useStock } from "../../context/StockContext";
import { generarPresupuestoExcel } from '../../api/utils.api';
import '../../styles/Buttons.css';

// Botones de acción

// Botón que elimina un marco o transacción por id (tipo recibido en props)
export const DeleteButton = ({ id, type, onDelete }) => {
  const { deleteStock } = useStock();
  const { deleteTransaccionContext } = useTransacciones();

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      try {
        if (type === "marco") {
          await deleteStock(id);
        } else if (type === "venta" || type === "pedido") {
          await deleteTransaccionContext(id);
        }
        if (onDelete) {
          onDelete();
        }
      } catch (error) {
        console.log(error);
      }
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
      Editar
    </button>
  );
};

// Botón que redirige a una URL específica pasada como prop
export const LinkButton = ({ className,url, text }) => {
  return (
    <Link to={url}>
      <button className={className?className:"link-button"}>{text}</button>
    </Link>
  );
};

// Botón que marca una transacción como completada
export const CompleteButton = ({ id }) => {
  const { patchTransaccionContext, getTransaccionPorId } = useTransacciones();

  const handleComplete = async () => {
    const confirm = window.confirm("¿Está seguro de que desea marcar esta transacción como entregada?");
    if (!confirm) return;

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
    const confirm = window.confirm("¿Está seguro de que desea marcar esta transacción como no entregada?");
    if (!confirm) return;

    try {
      const transaccion = await getTransaccionPorId(id);
      if (transaccion) {
        await patchTransaccionContext({
          ...transaccion,
          fechaEntrega: null,
        });
      } else {
        console.log(`Transacción con id ${id} no encontrada.`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="incomplete-button" onClick={handleIncomplete}>
      Desmarcar Entrega
    </button>
  );
};

// Botón que imprime una transacción
export const PrintButton = ({ id }) => {
  const { getTransaccionPorId } = useTransacciones();
  const {getPrecioDolarPorId}= useStock();

  const handleGenerateBudget = async () => {
    try {
      const transaccion = await getTransaccionPorId(id);
      if (transaccion) {
        const data = {
          cliente: transaccion.cuenta.cuentaNombre,
          productos: transaccion.itemsTransaccion.map(item => ({
            descripcion: item.idMarcoItemTransaccion,
            cantidad: item.cantidadItemTransaccion,
            precioUnitario: getPrecioDolarPorId(item.idMarcoItemTransaccion),
          })),
          subtotal: transaccion.itemsTransaccion.reduce((acc, item) => acc + (item.cantidadItemTransaccion * getPrecioDolarPorId(item.idMarcoItemTransaccion)), 0),
        };
        await generarPresupuestoExcel(data);
        console.log('Presupuesto generado y descargado exitosamente');
      } else {
        console.error(`Transacción con id ${id} no encontrada.`);
      }
    } catch (error) {
      console.error('Error al generar el presupuesto:', error);
    }
  };

  return (
    <button className="print-button" onClick={handleGenerateBudget}>
      Generar Presupuesto
    </button>
  );
};

// Configuración de botones por tipo
const buttonConfig = {
  // venta: [EditButton, DeleteButton, PrintButton, IncompleteButton],
  // pedido: [EditButton, DeleteButton, PrintButton, CompleteButton],
  // marco: [EditButton, DeleteButton],
  venta: [DeleteButton, PrintButton],
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
    <div className="options-buttons-container">
      {showOptions && (
        <div className="options-buttons">
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
        </div>
      )}
      <button className="options-button" onClick={handleOptions}>
        Opciones
      </button>
    </div >
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
