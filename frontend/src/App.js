import {Routes, Route} from 'react-router-dom'
import Navbar from "./components/utils/Navbar";
import LoginPage from "./pages/LoginPage"
import PedidosPage from "./pages/PedidosPage"
import VentasPage from "./pages/VentasPage"
import StockPage from "./pages/StockPage"
import './App.css';

function App() {
  return (<>
    <Navbar/>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/pedidos" element={<PedidosPage/>} />
      <Route path="/ventas" element={<VentasPage/>} />
      <Route path="/stock" element={<StockPage/>} />
    </Routes>
  </>
  );
}

export default App;