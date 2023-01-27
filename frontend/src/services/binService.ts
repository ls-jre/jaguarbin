import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

async function createBin() {
  try {
    const response = await axios.post(`${API_URL}/bins`);

    if (response) {
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }

  return null;
}

async function getBin(binId: string) {
  try {
    const response = await axios.get(`${API_URL}/bins/${binId}`);
    if (response) {
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }

  return null;
}

async function renameBin(binId: string, newName: string) {
  try {
    await axios.put(`${API_URL}/bins/${binId}`, { new_name: newName });
  } catch (err) {
    console.error(err);
  }
}

export default { getBin, createBin, renameBin };
