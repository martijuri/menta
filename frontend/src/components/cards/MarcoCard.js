import { useState, useEffect } from 'react';
import { OptionsButton } from "../utils/Buttons";
import { getTipoMarco } from "../../api/utils.api";

const MarcoCard = ({ marco }) => {
  const [tipoMarco, setTipoMarco] = useState('');

  useEffect(() => {
    async function fetchTipoMarco() {
      try {
        const response = await getTipoMarco(marco.idTipoMarco);
        setTipoMarco(response.Tipo);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTipoMarco();
  }, [marco.idTipoMarco]); 

  return (
      <div key={marco.idMarco} className='marco-card'>
        <h3>
          {marco.idMarco} - {tipoMarco}
        </h3>
        <p></p>
        <OptionsButton id={marco.idMarco} type={'marco'} />
      </div>
  );
};

export default MarcoCard;
