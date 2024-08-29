import { useState, useEffect } from "react";
import { useStock } from "../../context/StockContext";
import SearchBar from "../utils/SearchBar";
import { DeleteButton } from "../utils/Buttons";

const StockTable = () => {
  const [marcos, setMarcos] = useState([]);
  const [filteredMarcos, setFilteredMarcos] = useState([]);
  const { stock, cargarStock,  } = useStock();

  useEffect(() => {
    setMarcos(stock);
    setFilteredMarcos(stock);
  }, [stock]);

  const handleSearch = (results) => {
    setFilteredMarcos(results);
  };

  return (
    <div className="table-container">
      <SearchBar data={marcos} onSearch={handleSearch} searchKey="idMarco" />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Marco</th>
            <th>Cantidad</th>
            <th>Precio (USD)</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredMarcos.map((marco) => (
            <tr key={marco.idMarco}>
              <td>{marco.idMarco}</td>
              <td>{marco.idTipoMarco}</td>
              <td>{marco.stockMarco}</td>
              <td>{marco.precioDolar}</td>
              <td>
                <img
                  src={marco.imagenMarco}
                  alt={`Imagen de ${marco.idMarco}`}
                  width="50"
                />
              </td>
              <td>
                <button className="edit-button" id={marco.idMarco} onClick={cargarStock}>Editar</button>
                <DeleteButton id={marco.idMarco} type="marco" onDelete={cargarStock}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;