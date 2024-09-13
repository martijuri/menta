
import { OptionsButton } from "../utils/Buttons";

const MarcoCard = ({ marco }) => {
  
  return (
    <div key={marco.idMarco} className="marco-card">
      <h3>
        {marco.idMarco} - {marco.idTipoMarco} 
      </h3>
      <p>Cantidad: {marco.stockMarco} - Precio: ${marco.precioDolar}</p>
      <OptionsButton id={marco.idMarco} type={"marco"} />
    </div>
  );
};

export default MarcoCard;
