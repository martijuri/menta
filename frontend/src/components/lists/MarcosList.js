import { useState, useEffect } from "react";
import { getMarcos } from "../../api/marcos.api";
import MarcoCard from "../cards/MarcoCard";

const TransaccionesList = ({ type }) => {
  const [marcos, setMarcos] = useState([]);
  useEffect(() => {
    async function loadMarcos() {
      try {
        const response = await getMarcos();
        setMarcos(response);
      } catch (error) {
        console.log(error);
      }
    }

    loadMarcos();
  });
  return (
    <>
      <ul>
        {marcos.map((marco) => (
          <MarcoCard key={marco.idMarco} marco={marco} />
        ))}
      </ul>
    </>
  );
};

export default TransaccionesList;
