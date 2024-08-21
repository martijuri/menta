import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate, validate } from "../api/utils.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Aquí podrías agregar una llamada al backend para validar el token si es necesario
          await validate(token);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error validating token:', error);
          setIsAuthenticated(false);
          navigate('/login');
        }
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
      setLoading(false);
    };

    validateToken();
  }, [navigate]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await authenticate(username, password);
      const token = response.data.accessToken;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>; // Puedes mostrar un spinner o algún indicador de carga
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);