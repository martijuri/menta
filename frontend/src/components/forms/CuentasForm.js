import { useState, useContext, useEffect } from "react";
import FiltroInput from "../utils/FiltroInput";
import { CuentasContext } from "../../context/CuentasContext";
import "../../styles/CuentasForm.css";

const CuentasForm = ({ cuenta, selectCuenta, disabled }) => {
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
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga
  const { cuentas, postCuentaContext, patchCuentaContext } = useContext(CuentasContext);

  useEffect(() => {
    if (cuenta) {
      setCliente(`${cuenta.cuentaNombre} - CUIT: ${cuenta.cuentaCuit}`);
      setCuentaNombre(cuenta.cuentaNombre);
      setCuentaCuit(cuenta.cuentaCuit);
      setCuentaTelefono(cuenta.cuentaTelefono);
      setCuentaDireccion(cuenta.cuentaDireccion);
      setSeleccionado(true);
      setIsEditing(false);
    }
  }, [cuenta]);

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
      setIsEditing(false);
      selectCuenta(cuentaEncontrada);
    }
  };

  const handleSubmitCuenta = () => {
    if (!cuentaNombre) {
      alert("El campo del nombre no puede estar vacío");
      return;
    }

    setIsLoading(true); // Iniciar la carga

    const cuentaNueva = {
      cuentaNombre,
      cuentaCuit,
      cuentaTelefono,
      cuentaDireccion,
    };
    if (cliente === "Nuevo Cliente") {
      postCuentaContext(cuentaNueva).then((nuevaCuenta) => {
        if (nuevaCuenta && nuevaCuenta.length > 0) {
          selectCuenta(nuevaCuenta[0]); // Asegurarse de pasar el objeto de cuenta
          setCliente(`${nuevaCuenta[0].cuentaNombre} - CUIT: ${nuevaCuenta[0].cuentaCuit}`);
        } else {
          console.error("Error al crear la nueva cuenta");
        }
        setIsLoading(false); // Finalizar la carga
      });
    } else {
      if (!cuenta) {
        console.error("Error: cuenta no definida");
        setIsLoading(false); // Finalizar la carga en caso de error
        return;
      }
      const cuentaActualizada = {
        ...cuenta,
        cuentaNombre,
        cuentaCuit,
        cuentaTelefono,
        cuentaDireccion,
      };
      patchCuentaContext(cuentaActualizada).then((cuentaActualizada) => {
        if (cuentaActualizada && cuentaActualizada.length > 0) {
          selectCuenta(cuentaActualizada[0]); // Asegurarse de pasar el objeto de cuenta
          setCliente(`${cuentaActualizada[0].cuentaNombre} - CUIT: ${cuentaActualizada[0].cuentaCuit}`);
        } else {
          console.error("Error al actualizar la cuenta");
        }
        setIsLoading(false); // Finalizar la carga
      });
    }
    setIsEditing(false); // Deshabilitar edición después de guardar
  };

  const handleEdit = () => {
    setIsEditing(true);
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
        disabled={disabled}
      />
      <div className="info-cuenta-container">
        <div>
          <label>Nombre
          <input
            type="text"
            value={cuentaNombre}
            onChange={handleInputChange}
            name="nombre"
            placeholder="Ingrese Nombre"
            disabled={!seleccionado || !isEditing || disabled}
          />
          </label>
        </div>
        <div>
          <label>CUIT
          <input
            type="text"
            value={cuentaCuit}
            onChange={handleInputChange}
            name="cuit"
            placeholder="Ingrese CUIT"
            disabled={!seleccionado || !isEditing || disabled}
          />
          </label>
        </div>
        <div>
          <label>Telefono
          <input
            type="text"
            value={cuentaTelefono}
            onChange={handleInputChange}
            name="telefono"
            placeholder="Ingrese Telefono"
            disabled={!seleccionado || !isEditing || disabled}
          />
          </label>
        </div>
        <div>
          <label>Direccion
          <input
            type="text"
            value={cuentaDireccion}
            onChange={handleInputChange}
            name="direccion"
            placeholder="Ingrese Direccion"
            disabled={!seleccionado || !isEditing || disabled}
          />
          </label>
        </div>
      </div>
      {isEditing ? (
        <button
          onClick={handleSubmitCuenta}
          type="button" 
          disabled={!cliente || cliente === "" || !cuentaNombre || disabled || isLoading}
        >
          Guardar
        </button>
      ) : (
        <button
          onClick={handleEdit}
          type="button" 
          disabled={disabled || isLoading}
        >
          Editar
        </button>
      )}
    </div>
  );
};

export default CuentasForm;