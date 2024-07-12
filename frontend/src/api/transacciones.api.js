import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getTransacciones = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/transacciones`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      console.log("invalid token");
    } else {
      console.log(error);
    }
  }
};

export const getPedidos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/pedidos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      console.log("invalid token");
    } else {
      console.log(error);
    }
  }
};

export const getVentas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/ventas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      console.log("invalid token");
    } else {
      console.log(error);
    }
  }
};

export const getTransaccion = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/transacciones/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      console.log("invalid token");
    } else {
      console.log(error);
    }
  }
};

export const postTransaccion = async (transaccion) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/transacciones`,
      transaccion,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      console.log("invalid token");
    } else {
      console.log(error);
    }
  }
};

export const patchTransaccion = async (id, transaccion) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/transacciones/${id}`,
      transaccion,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      console.log("invalid token");
    } else {
      console.log(error);
    }
  }
};

export const deleteTransaccion = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/transacciones/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      console.log("invalid token");
    } else {
      console.log(error);
    }
  }
};
