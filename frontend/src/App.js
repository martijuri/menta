import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/utils/Navbar";
import LoginPage from "./pages/LoginPage";
import PedidosPage from "./pages/PedidosPage";
import VentasPage from "./pages/VentasPage";
import StockPage from "./pages/StockPage";
import PedidosFormPage from "./pages/PedidosFormPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import StockFormPage from "./pages/StockFormPage";
import "./App.css";
import { TiposProvider } from "./context/TiposContext";
import { CuentasProvider } from "./context/CuentasContext";
import { StockProvider } from "./context/StockContext";
import { TransaccionProvider } from "./context/TransaccionContext";
import { TransaccionesProvider } from "./context/TransaccionesContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ItemsTransaccionProvider } from "./context/ItemsTransaccionContext";

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
                <ItemsTransaccionProvider>
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                      path="/home"
                      element={
                        <ProtectedRoute>
                          <HomePage />
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
                    ></Route>
                    <Route path="/pedidos/form" element={<PedidosFormPage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                  </Routes>
                </ItemsTransaccionProvider>
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
