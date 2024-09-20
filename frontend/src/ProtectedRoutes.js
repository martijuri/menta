import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/utils/Navbar";
import PedidosPage from "./pages/PedidosPage";
import VentasPage from "./pages/VentasPage";
import StockPage from "./pages/StockPage";
import PedidosFormPage from "./pages/PedidosFormPage";
import UserPage from "./pages/UserPage";
import StockFormPage from "./pages/StockFormPage";
import { TiposProvider } from "./context/TiposContext";
import { CuentasProvider } from "./context/CuentasContext";
import { StockProvider } from "./context/StockContext";
import { TransaccionProvider } from "./context/TransaccionContext";
import { TransaccionesProvider } from "./context/TransaccionesContext";
import { useAuth } from "./context/AuthContext";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const ProtectedRoutes = () => {
  return (
    <TiposProvider>
      <CuentasProvider>
        <StockProvider>
          <TransaccionProvider>
            <TransaccionesProvider>
              <Navbar />
              <div className="app-container">
                <Routes>
                  <Route
                    path="/pedidos"
                    element={
                      <ProtectedRoute>
                        <PedidosPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ventas"
                    element={
                      <ProtectedRoute>
                        <VentasPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/stock"
                    element={
                      <ProtectedRoute>
                        <StockPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/stock/new"
                    element={
                      <ProtectedRoute>
                        <StockFormPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/transacciones/:id/edit"
                    element={
                      <ProtectedRoute>
                        <PedidosFormPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user"
                    element={
                      <ProtectedRoute>
                        <UserPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/pedidos/form" element={<PedidosFormPage />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </div>
            </TransaccionesProvider>
          </TransaccionProvider>
        </StockProvider>
      </CuentasProvider>
    </TiposProvider>
  );
};

export default ProtectedRoutes;