import axios from 'axios';

export const getTransacciones = async () => await axios.get('http://localhost:4000/api/transacciones');
export const getTransaccion = async (id) => await axios.get(`http://localhost:4000/api/transacciones/${id}`);
export const postTransaccion = async (transaccion) =>  await axios.post('http://localhost:4000/api/transacciones', transaccion);
export const patchTransaccion = async (id, transaccion) => await axios.patch(`http://localhost:4000/api/transacciones/${id}`, transaccion);
export const deleteTransaccion = async (id) => await axios.delete(`http://localhost:4000/api/transacciones/${id}`);