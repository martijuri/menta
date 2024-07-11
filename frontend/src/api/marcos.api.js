import axios from 'axios';

export const getMarcos = async () => await axios.get('http://localhost:4000/api/marcos');
export const getMarco = async (id) => await axios.get(`http://localhost:4000/api/marcos/${id}`);
export const postMarco = async (marco) =>  await axios.post('http://localhost:4000/api/marcos', marco);
export const patchMarco = async (id, marco) => await axios.patch(`http://localhost:4000/api/marcos/${id}`, marco);
export const deleteMarco = async (id) => await axios.delete(`http://localhost:4000/api/marcos/${id}`);
