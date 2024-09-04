import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  authenticate,
  validate,
  updateUser,
  getPerfil,
  registerUser
} from "../api/utils.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await validate(token);
          setIsAuthenticated(true);
          const response = await getPerfil();
          setUser(response);
          console.log("usuario validado: ", response);
        } catch (error) {
          console.error("Error validating token:", error);
          setIsAuthenticated(false);
          navigate("/login");
        }
      } else {
        setIsAuthenticated(false);
        navigate("/login");
      }
      setLoading(false);
    };

    validateToken();
  }, [navigate]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await authenticate(username, password);
      console.log("usuario logeado: ", response);
      const token = response.accessToken;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setUser(response.user);
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const updateAccount = async (newUserData) => {
    setLoading(true);
    try {
      const { user: updatedUser } = await updateUser(newUserData);
      setUser(updatedUser); // Actualiza la información del usuario en el estado
      console.log("usuario actualizado: ", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password, email, administrador) => {
    setLoading(true);
    try {
      await registerUser({ username, password, email, administrador });
      login(username, password);
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, updateAccount, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
