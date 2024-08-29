import StockTable from "../components/lists/StockTable";
import { StockProvider } from "../context/StockContext";
import {LinkButton} from "../components/utils/Buttons";

const StockPage = () => {
  return (
    <>
    <StockProvider>
      <h1>Stock Page</h1>
      <LinkButton url="/stock/new" text="Agregar Stock" />
      <StockTable />
    </StockProvider>
    </>
  );
};

export default StockPage;