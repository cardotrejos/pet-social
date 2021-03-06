import axios from 'axios'

async function getComments(id) {
  try {
    const url = `https://dummyapi.io/data/api/post/${id}/comment`
    const response = await axios.get(url, { headers: { 'app-id': '5f469779007a770002d64f1b' } });
    const data = response.data.data;

    return data;

  } catch (e) {
    console.error(e)
  }

}

export default getComments;


