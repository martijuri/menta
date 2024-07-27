// import { useState, useEffect } from 'react';
// import { getTipoMarco } from "../../api/utils.api";
// import { useContext } from "react";
import { OptionsButton } from "../utils/Buttons";

const MarcoCard = ({ marco }) => {
  return (
    <div key={marco.idMarco} className="marco-card">
      <h3>
        {marco.idMarco} - {marco.idTipoMarco}
      </h3>
      <p></p>
      <OptionsButton id={marco.idMarco} type={"marco"} />
    </div>
  );
};

export default MarcoCard;
