import { confirmUsuario, generateAccessToken } from "../controllers/usuarios.controller.js";

export const login = (req, res) => {
  res.send(`<html>
      <head> <title>Login</title> </head>
      <body>
        <form action="/auth" method="post">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username">
          <label for="password">Password:</label> 
          <input type="password" id="password" name="password">
          <button type="submit">Login</button>
        </form>
      </html>`);
};

export const auth = async (req, res) => {
    const { username, password } = req.body;
  
    //consulta a base de datos
    const response = await confirmUsuario(username, password);
    console.log("respuesta al confirmar usuario",response);
  
    if (response) {
      const accessToken = generateAccessToken(username);
      res.header("Authorization", "Bearer " + accessToken).json({ accessToken, response });
    } else {
      res.status(401).send("Usuario incorrecto");
    }
  };