import { useState, useContext } from "react";
import FiltroInput from "../utils/FiltroInput";
import {
  CuentasContext,
  postCuentaContext,
  patchCuentaContext,
} from "../../context/CuentasContext";
import '../../styles/CuentasForm.css';

const CuentasForm = ({ cuenta, selectCuenta }) => {
  const [cliente, setCliente] = useState(
    cuenta ? `${cuenta.cuentaNombre} - CUIT: ${cuenta.cuentaCuit}` : ""
  );
  const [cuentaNombre, setCuentaNombre] = useState(
    cuenta ? cuenta.cuentaNombre : ""
  );
  const [cuentaCuit, setCuentaCuit] = useState(cuenta ? cuenta.cuentaCuit : "");
  const [cuentaTelefono, setCuentaTelefono] = useState(
    cuenta ? cuenta.cuentaTelefono : ""
  );
  const [cuentaDireccion, setCuentaDireccion] = useState(
    cuenta ? cuenta.cuentaDireccion : ""
  );
  const [seleccionado, setSeleccionado] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // Nuevo estado para controlar la edición
  const { cuentas } = useContext(CuentasContext);

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
      setIsEditing(true); // Habilitar edición cuando se selecciona "Nuevo Cliente"
    } else if (
      cuentas.map((cuenta) => cuenta.cuentaNombre).includes(dato.split(" -")[0])
    ) {
      const cuentaEncontrada = cuentas.find(
        (cuenta) => cuenta.cuentaNombre === dato.split(" -")[0]
      );
      setCliente(dato);
      setCuentaNombre(cuentaEncontrada.cuentaNombre);
      setCuentaCuit(cuentaEncontrada.cuentaCuit);
      setCuentaTelefono(cuentaEncontrada.cuentaTelefono);
      setCuentaDireccion(cuentaEncontrada.cuentaDireccion);
      setSeleccionado(true);
      setIsEditing(true);
      selectCuenta(cuentaEncontrada);
    }
  };

  const handleSubmitCuenta = () => {
    if (!cuentaNombre) {
      alert("El campo del nombre no puede estar vacío");
      return;
    }

    const cuentaNueva = {
      cuentaNombre,
      cuentaCuit,
      cuentaTelefono,
      cuentaDireccion,
    };
    if (cliente === "Nuevo Cliente") {
      console.log("Postear cuenta: ", cuentaNueva);
      postCuentaContext(cuentaNueva);
    } else {
      const cuentaActualizada = {
        ...cuenta,
        cuentaNombre,
        cuentaCuit,
        cuentaTelefono,
        cuentaDireccion,
      };
      console.log("Patchear cuenta: ", cuentaActualizada);
      patchCuentaContext(cuentaActualizada);
    }
    selectCuenta(cuentaNueva);
    setIsEditing(false); // Deshabilitar edición después de guardar
  };

  return (
    <div className="cuentas-form">
      <FiltroInput
        options={[
          "Nuevo Cliente",
          ...cuentas.map(
            (cuenta) => `${cuenta.cuentaNombre} - CUIT: ${cuenta.cuentaCuit}`
          ),
        ]}
        label="Cliente"
        onSelection={handleSelection}
        placeholder={cliente || "Seleccione o cree una cuenta"}
      />
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={cuentaNombre}
          onChange={handleInputChange}
          name="nombre"
          placeholder="Ingrese Nombre"
          disabled={!seleccionado || !isEditing}
        />
        <label>CUIT</label>
        <input
          type="text"
          value={cuentaCuit}
          onChange={handleInputChange}
          name="cuit"
          placeholder="Ingrese CUIT"
          disabled={!seleccionado || !isEditing}
        />
        <label>Telefono</label>
        <input
          type="text"
          value={cuentaTelefono}
          onChange={handleInputChange}
          name="telefono"
          placeholder="Ingrese Telefono"
          disabled={!seleccionado || !isEditing}
        />
        <label>Direccion</label>
        <input
          type="text"
          value={cuentaDireccion}
          onChange={handleInputChange}
          name="direccion"
          placeholder="Ingrese Direccion"
          disabled={!seleccionado || !isEditing}
        />
      </div>
      <button
        onClick={handleSubmitCuenta}
        disabled={!cliente || cliente === "" || !cuentaNombre}
      >
        Guardar
      </button>
    </div>
  );
};

export default CuentasForm;