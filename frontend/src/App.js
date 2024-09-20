import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { CuentasProvider } from "./context/CuentasContext";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <CuentasProvider>
            <LoginPage />
          </CuentasProvider>
        }
      />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}