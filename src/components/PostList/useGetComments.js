import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetComments(id) {

  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    axios
      .get(`https://dummyapi.io/data/api/post/${id}/comment`, {
        headers: {
          'app-id': '5f443b52855e4500023b32dd'
        }
      })
      .then(res => {
        setComments(res.data.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [id]);

  return { comments }
}