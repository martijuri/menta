import StockTable from "../components/lists/StockTable";
import { StockProvider } from "../context/StockContext";
import {LinkButton} from "../components/utils/Buttons";

const StockPage = () => {
  return (
    <>
    <StockProvider>
      <LinkButton url="/stock/new" text="Agregar Stock" />
      <StockTable />
    </StockProvider>
    </>
  );
};

export default StockPage;