import { useState, useEffect, useContext } from "react";
import { StockContext } from "../../context/StockContext";
import SearchBar from "../utils/SearchBar";
import { EditButton, LinkButton } from "../utils/Buttons";

const StockTable = () => {
  const [marcos, setMarcos] = useState([]);
  const [filteredMarcos, setFilteredMarcos] = useState([]);
  const { stock } = useContext(StockContext);

  useEffect(() => {
    setMarcos(stock);
    setFilteredMarcos(stock);
  }, [stock]);

  const handleStockChange = (id, delta) => {
    setMarcos((prevMarcos) =>
      prevMarcos.map((marco) =>
        marco.idMarco === id ? { ...marco, stockMarco: marco.stockMarco + delta } : marco
      )
    );
  };

  const handleSearch = (results) => {
    setFilteredMarcos(results);
  };

  return (
    <div>
      <SearchBar data={marcos} onSearch={handleSearch} searchKey="idMarco" />
      <LinkButton url="/marcos/new" text="Agregar Stock" />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Marco</th>
            <th>Cantidad</th>
            <th>Precio (USD)</th>
            <th>Imagen</th>
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
                <img src={marco.imagenMarco} alt={`Imagen de ${marco.idMarco}`} width="50" />
              </td>
              <td>
                <button onClick={() => handleStockChange(marco.idMarco, 1)}>Sumar</button>
              </td>
              <td>
                <button onClick={() => handleStockChange(marco.idMarco, -1)}>Restar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;