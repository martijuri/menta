import TransaccionesList from "../components/lists/TransaccionesList";

const VentasPage = () => {
  return (
    <div className="ventas-page-container">
      <TransaccionesList type = {"ventas"} />      
    </div>
  );
};
export default VentasPage;
