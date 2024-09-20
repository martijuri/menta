import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "", email: "", administrador: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { login, register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isRegister) {
        await register(credentials.username, credentials.email, credentials.password, credentials.administrador);
      } else {
        await login(credentials.username, credentials.password);
      }
    } catch (err) {
      setError(isRegister ? "Registro fallido. Por favor, inténtelo de nuevo." : "Inicio de sesión fallido. Por favor, verifique sus credenciales e inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>{isRegister ? "Registro" : "Inicio de Sesión"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </label>
        <br />
        {isRegister && (
          <>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </label>
            <br />
          </>
        )}
        <button type="submit" disabled={loading}>
          {loading ? (isRegister ? "Registrando..." : "Iniciando sesión...") : (isRegister ? "Registrar" : "Iniciar sesión")}
        </button>
        <br />
        {error && <p>{error}</p>}
      </form>
      {/* Ocultar el botón de registro por ahora */}
      {false && (
        <p>
          {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}
          >
            {isRegister ? "Inicia sesión aquí" : "Regístrate aquí"}
          </button>
        </p>
      )}
    </div>
  );
};

export default LoginPage;