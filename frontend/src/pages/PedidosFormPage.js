import TransaccionesForm from "../components/forms/TransaccionesForm";
import { useContext, useState } from "react";
import { TransaccionContext } from "../context/TransaccionContext";
import { useParams } from "react-router-dom";

const PedidosFormPage = () => {
  return (
    <div>
      <h1>FormPage</h1>
      <TransaccionesForm
        type={"pedidos"}
      />
    </div>
  );
};
export default PedidosFormPage;
