import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../api/utils.api";
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function auth(username, password) {
      try {
        const response = await authenticate(username, password);
        //access token
        localStorage.setItem("token", response.data.accessToken);
        //Redirigir a /home
        navigate("/home");
        login();
      } catch (error) {
        console.log(error);
      }
    }
    auth(username, password);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
