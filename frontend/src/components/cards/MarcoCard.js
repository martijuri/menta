// import { useState, useEffect } from 'react';
// import { getTipoMarco } from "../../api/utils.api";
import { useContext } from "react";
import { OptionsButton } from "../utils/Buttons";
import { TiposContext } from "../../context/TiposContext";

const MarcoCard = ({ marco }) => {
  const { tiposDeMarcos } = useContext(TiposContext);
  const tipoMarcoEncontrado = tiposDeMarcos.find(tipo => tipo[0] === marco.idTipoMarco);
  const nombreTipoMarco = tipoMarcoEncontrado ? tipoMarcoEncontrado[1] : 'Tipo no encontrado';

  // const [tipoMarco, setTipoMarco] = useState('');

  // useEffect(() => {
  //   async function fetchTipoMarco() {
  //     try {
  //       const response = await getTipoMarco(marco.idTipoMarco);
  //       setTipoMarco(response.Tipo);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchTipoMarco();
  // }, [marco.idTipoMarco]); 

  return (
    <div key={marco.idMarco} className='marco-card'>
      <h3>
        {marco.idMarco} - {nombreTipoMarco}
      </h3>
      <p></p>
      <OptionsButton id={marco.idMarco} type={'marco'} />
    </div>
);
};

export default MarcoCard;
