import { deleteTransaccion, patchTransaccion } from "../api/transacciones.api";
import { Link } from "react-router-dom";

export const DeleteButton = ({ id }) => {
  const handleDelete = async () => {
    try {
      const response = await deleteTransaccion(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export const EditButton = ({ id }) => {
  const handleEdit = async () => {
    <Link to={`/transacciones/${id}/edit`} />;
  };
  return <button onClick={handleEdit}>Edit</button>;
};

export const CompleteButton = ({ id }) => {
  const handleComplete = async () => {
    try {
      await patchTransaccion(id, { ventaTransaccion: 1 });
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleComplete}>Complete</button>;
};

export const IncompleteButton = ({ id }) => {
  const handleIncomplete = async () => {
    try {
      await patchTransaccion(id, { ventaTransaccion: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleIncomplete}>Incomplete</button>;
};

export const PrintButton = ({ id }) => {
  const handlePrint = async () => {
    return <>
        <Link to={`/transacciones/${id}/print`} />;
    </>;
  };

  return <button onClick={handlePrint}>Print</button>;
};