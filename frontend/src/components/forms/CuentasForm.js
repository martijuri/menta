import { useState, useContext } from "react";
import FiltroInput from "../utils/FiltroInput";
import { CuentasContext, postCuentaContext,patchCuentaContext } from "../../context/CuentasContex";

const CuentasForm = ({ cuenta, selectCuenta }) => {
  // Corrección en el uso de useState
  const [cliente, setCliente] = useState(
    cuenta.cuentaNombre + " - CUIT: " + cuenta.cuentaCuit
  );
  const [cuentaNombre, setCuentaNombre] = useState(cuenta.cuentaNombre);
  const [cuentaCuit, setCuentaCuit] = useState(cuenta.cuentaCuit);
  const [cuentaTelefono, setCuentaTelefono] = useState(cuenta.cuentaTelefono);
  const [cuentaDireccion, setCuentaDireccion] = useState(
    cuenta.cuentaDireccion
  );
  const [seleccionado, setSeleccionado] = useState(false);
  const { cuentas } = useContext(CuentasContext);

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nombre":
        setCuentaNombre(value);
        break;
      case "cuit":
        setCuentaCuit(value);
        break;
      case "telefono":
        setCuentaTelefono(value);
        break;
      case "direccion":
        setCuentaDireccion(value);
        break;
      default:
        break;
    }
  };

  const handleSelection = (dato) => {
    if (dato === "Nuevo Cliente") {
      setCliente("Nuevo Cliente");
      setCuentaNombre("");
      setCuentaCuit("");
      setCuentaTelefono("");
      setCuentaDireccion("");
      setSeleccionado(true);
    } else if (
      cuentas.map((cuenta) => cuenta.cuentaNombre).includes(dato.split(" -")[0])
    ) {
      const cuentaSeleccionada = cuentas.find(
        (cuenta) => cuenta.cuentaNombre === dato.split(" -")[0]
      );
      setCliente(dato);
      setCuentaNombre(cuentaSeleccionada.cuentaNombre);
      setCuentaCuit(cuentaSeleccionada.cuentaCuit);
      setCuentaTelefono(cuentaSeleccionada.cuentaTelefono);
      setCuentaDireccion(cuentaSeleccionada.cuentaDireccion);
      setSeleccionado(false);
    }
  };

  // Función para enviar la cuenta
  const handleSubmitCuenta = () => {
    const cuentaNueva = {
      cuentaNombre,
      cuentaCuit,
      cuentaTelefono,
      cuentaDireccion,
    };
    console.log("Cuenta: ", cuentaNueva);
    if (cliente === "Nuevo Cliente") {
      console.log("Postear cuenta: ", cuentaNueva);
      postCuentaContext(cuentaNueva);
    } else {
      console.log("Patchear cuenta: ", cuentaNueva);
      patchCuentaContext(cuentaNueva);
    }
    selectCuenta(cuentaNueva);
  };

  return (
    <div>
      <h1>CuentasForm</h1>
      <FiltroInput
        options={[
          "Nuevo Cliente",
          ...cuentas.map((cuenta) => `${cuenta.cuentaNombre} - CUIT: ${cuenta.cuentaCuit}`)
        ]}
        label="Cliente"
        onSelection={handleSelection}
        placeholder={cliente}
      />
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={cuentaNombre}
          onChange={handleInputChange}
          name="nombre"
          placeholder="Ingrese Nombre"
          disabled={!seleccionado}
        />
        <label>CUIT</label>
        <input
          type="text"
          value={cuentaCuit}
          onChange={handleInputChange}
          name="cuit"
          placeholder="Ingrese CUIT"
          disabled={!seleccionado}
        />
        <label>Telefono</label>
        <input
          type="text"
          value={cuentaTelefono}
          onChange={handleInputChange}
          name="telefono"
          placeholder="Ingrese Telefono"
          disabled={!seleccionado}
        />
        <label>Direccion</label>
        <input
          type="text"
          value={cuentaDireccion}
          onChange={handleInputChange}
          name="direccion"
          placeholder="Ingrese Direccion"
          disabled={!seleccionado}
        />
      </div>
      <button onClick={handleSubmitCuenta}>Guardar</button>
    </div>
  );
};

export default CuentasForm;
