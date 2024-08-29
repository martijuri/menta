import { useState } from "react";
import { useAuth } from '../context/AuthContext';

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
      setError(isRegister ? "Registration failed. Please try again." : "Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      {/* Sección de registro oculta */}
      {false && (
        <div>
          <h1>Register Page</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
            </label>
            <br />
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
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <br />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}
            >
              Login here
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;