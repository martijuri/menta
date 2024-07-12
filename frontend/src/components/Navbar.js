import { Link } from "react-router-dom";

// This component will be used to display the navigation bar at the top of the page.
function Navbar() {
  return (
    <div>
      <h1>Navbar</h1>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/pedidos">Pedidos</Link>
        </li>
        <li>
          <Link to="/marcos">Marcos</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
