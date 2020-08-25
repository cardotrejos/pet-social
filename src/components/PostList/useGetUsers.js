import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetUSer(id) {

  const [user, setUser] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `https://dummyapi.io/data/api/user/${id}`,
      headers: { 'app-id': '5f443b52855e4500023b32dd' },
    }).then(res => {
      setUser(res.data.data)
    }).catch(e => {
      console.error(e)
    })
  }, [id])

  return { user }
}
