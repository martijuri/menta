import axios from 'axios';


const BASE_URL = 'http://localhost:4000';

export const getMarcos = async () => await axios.get(`${BASE_URL}/api/marcos`);
export const getMarco = async (id) => await axios.get(`${BASE_URL}/api/marcos/${id}`);
export const postMarco = async (marco) =>  await axios.post('${BASE_URL}/api/marcos', marco);
export const patchMarco = async (id, marco) => await axios.patch(`${BASE_URL}/api/marcos/${id}`, marco);
export const deleteMarco = async (id) => await axios.delete(`${BASE_URL}/api/marcos/${id}`);
