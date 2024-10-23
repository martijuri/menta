import { useState, useEffect } from "react";
import { useStock } from "../../context/StockContext";
import { useTipos } from "../../context/TiposContext";
import SearchBar from "../utils/SearchBar";
import { DeleteButton } from "../utils/Buttons";
import Filter from "../utils/Filter";
import '../../styles/StockTable.css';

const StockTable = () => {
  const [marcos, setMarcos] = useState([]);
  const [filteredMarcos, setFilteredMarcos] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState("");
  const [editingMarco, setEditingMarco] = useState(null);
  const [editValues, setEditValues] = useState({});
  const { stock, deleteStock, updateStock } = useStock();
  const { tiposDeMarcos, getTipoMarco, cargarTiposDeMarcos } = useTipos();

  useEffect(() => {
    setMarcos(stock);
    setFilteredMarcos(stock);
    cargarTiposDeMarcos();
  }, [stock]);

  const handleSearch = (results) => {
    setFilteredMarcos(results);
  };

  const handleTipoChange = (e) => {
    const tipo = e.target.value;
    setSelectedTipo(tipo);
    if (tipo === "") {
      setFilteredMarcos(stock);
    } else {
      setFilteredMarcos(
        stock.filter((marco) => String(marco.idTipoMarco) === String(tipo))
      );
    }
  };

  const handleEditClick = (marco) => {
    setEditingMarco(marco.idMarco);
    setEditValues({
      idTipoMarco: marco.idTipoMarco,
      stockMarco: marco.stockMarco,
      precioDolar: marco.precioDolar,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };

  const handleAcceptClick = (idMarco) => {
    updateStock(idMarco, editValues);
    setEditingMarco(null);
  };

  const handleCancelClick = () => {
    setEditingMarco(null);
  };

  const tipoOptions = tiposDeMarcos.map((tipo) => ({
    id: tipo.idTipo,
    name: tipo.Tipo,
  }));

  return (
    <div className="table-container">
      <div className="table-filter">
      <SearchBar
        data={marcos}
        onSearch={handleSearch}
        searchKey="idMarco"
        searchOnChange={true}
      />
      <Filter
        label="Filtrar por tipo de marco"
        options={tipoOptions}
        selectedValue={selectedTipo}
        handleChange={handleTipoChange}
      />
      </div>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo</th>
            <th>Stock</th>
            <th>Reservados</th>
            <th>Precio (USD)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredMarcos.map((marco) => (
            <tr key={marco.idMarco}>
              <td>{marco.idMarco}</td>
              <td>
                {editingMarco === marco.idMarco ? (
                  <select
                    name="idTipoMarco"
                    value={editValues.idTipoMarco}
                    onChange={handleInputChange}
                  >
                    {tipoOptions.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  getTipoMarco(marco.idTipoMarco).Tipo || marco.idTipoMarco
                )}
              </td>
              <td>
                {editingMarco === marco.idMarco ? (
                  <input
                    type="number"
                    name="stockMarco"
                    value={editValues.stockMarco}
                    onChange={handleInputChange}
                  />
                ) : (
                  marco.stockMarco
                )}
              </td>
              <td>{marco.reservados}</td>
              <td>
                {editingMarco === marco.idMarco ? (
                  <input
                    type="number"
                    name="precioDolar"
                    value={editValues.precioDolar}
                    onChange={handleInputChange}
                  />
                ) : (
                  marco.precioDolar
                )}
              </td>
              <td>
                {editingMarco === marco.idMarco ? (
                  <>
                    <button
                      className="accept-button"
                      onClick={() => handleAcceptClick(marco.idMarco)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="cancel-button"
                      onClick={handleCancelClick}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(marco)}
                    >
                      Editar
                    </button>
                    <DeleteButton
                      id={marco.idMarco}
                      type="marco"
                      onDelete={() => deleteStock(marco.idMarco)}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;