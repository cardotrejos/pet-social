import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetUSer(id) {

  const [user, setUser] = useState([]);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: "GET",
      url: `https://dummyapi.io/data/api/user/${id}`,
      headers: { 'app-id': '5f443b52855e4500023b32dd' },
      cancelToken: new axios.CancelToken(c => cancel = c),
    }).then(res => {
      setUser(res.data.data)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  },[id])

  return { user }
}
