import StockTable from "../components/lists/StockTable";
import { StockProvider } from "../context/StockContext";

const StockPage = () => {
  return (
    <>
    <StockProvider>
      <h1>Stock Page</h1>
      <StockTable />
    </StockProvider>
    </>
  );
};

export default StockPage;