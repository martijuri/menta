import {Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage"
import PedidosPage from "./pages/PedidosPage"
import VentasPage from "./pages/VentasPage"

function App() {
  return (<>
    <Navbar/>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/pedidos" element={<PedidosPage/>} />
      <Route path="/ventas" element={<VentasPage/>} />
    </Routes>
  </>
  );
}

export default App;