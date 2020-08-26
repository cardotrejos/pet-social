import axios from 'axios'

async function getUSer(id) {
  try {
    const url = `https://dummyapi.io/data/api/user/${id}`
    const response = await axios.get(url, { headers: { 'app-id': '5f4599ce1ba62700027135eb' } });
    const data = await response.data;

    return data;

  } catch (e) {
    console.error(e)
  }

}

export default getUSer