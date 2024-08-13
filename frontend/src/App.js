import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/utils/Navbar";
import LoginPage from "./pages/LoginPage";
import PedidosPage from "./pages/PedidosPage";
import VentasPage from "./pages/VentasPage";
import StockPage from "./pages/StockPage";
import PedidosFormPage from "./pages/PedidosFormPage";
import "./App.css";
import { TiposProvider } from "./context/TiposContext";
import { CuentasProvider } from "./context/CuentasContex";
import { StockProvider } from "./context/StockContext";
import { TransaccionProvider } from "./context/TransaccionContext";
import { TransaccionesProvider } from "./context/TransaccionesContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <TiposProvider>
        <CuentasProvider>
          <StockProvider>
            <TransaccionProvider>
              <TransaccionesProvider>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <h1>Home</h1>
                      </ProtectedRoute>
                    }
                  />
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
                    path="/transacciones/:id/edit"
                    element={
                      <ProtectedRoute>
                        <PedidosFormPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </TransaccionesProvider>
            </TransaccionProvider>
          </StockProvider>
        </CuentasProvider>
      </TiposProvider>
    </>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
        <App />
    </AuthProvider>
  );
}
