import { useState, useEffect } from "react";

const UserProfile = ({ user, updateUser, logout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    id: user.id,
    username: user.username,
    password: user.password,
    email: user.email,
    administrador: user.administrador,
  });

  useEffect(() => {
    setFormData({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      administrador: user.administrador,
    });
  }, [user]);

  useEffect(() => {
    console.log("Form data:", formData);
  }, [formData]);

  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      administrador: user.administrador,
    });
    setIsEditing(false);
  };

  return (
    <div className="user-profile-container">
      <h1>User Page</h1>
      {isEditing ? (
        <>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Contraseña:
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Administrador:
            <input
              type="checkbox"
              name="administrador"
              checked={formData.administrador}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Editar Perfil</button>
          <h2>Bienvenid@ {user.username}</h2>
          <h3>
            Contraseña: {showPassword ? user.password : "********"}
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </h3>
          <h3>Email: {user.email}</h3>
          <h3>
            Cuenta:{" "}
            {user.administrador === 1 ? "Administrador" : "Usuario Común"}
          </h3>
          <button className="logout-button" onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;