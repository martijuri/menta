import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

// Este componente se usa para mostrar la barra de navegación en la parte superior de la página.
function Navbar() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Navbar</h1>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {user && user.administrador === 1 && (
          <>
            <li>
              <Link to="/pedidos">Pedidos</Link>
            </li>
            <li>
              <Link to="/stock">Stock</Link>
            </li>
            <li>
              <Link to="/ventas">Ventas</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/user">Perfil de Usuario</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;