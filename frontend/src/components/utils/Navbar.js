import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import "../../styles/Navbar.css";

// Este componente se usa para mostrar la barra de navegación en la parte superior de la página.
function Navbar() {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={`navbar ${isExpanded ? "expanded" : ""}`}>
        <span className="toggle-btn" onClick={toggleNavbar}>
          &#9776;
        </span>
        <ul>
          {user && user.administrador === 1 && (
            <>
              <li>
                <Link to="/stock">Control de stock</Link>
              </li>
              <li>
                <Link to="/pedidos">Administrador de pedidos</Link>
              </li>
              <li>
                <Link to="/ventas">Historial de ventas</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/user">Perfil de Usuario</Link>
          </li>
        </ul>
      </div>
      <div
        className={`overlay ${isExpanded ? "active" : ""}`}
        onClick={toggleNavbar}
      ></div>
    </>
  );
}

export default Navbar;
