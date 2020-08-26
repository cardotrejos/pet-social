import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetPosts(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: "GET",
      url: "https://dummyapi.io/data/api/post",
      headers: { 'app-id': '5f4599ce1ba62700027135eb' },
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c),
    }).then(res => {
      setPosts(prevPosts => {
        return [...new Set([...prevPosts, ...res.data.data])]
      })
      setHasMore(res.data.data.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, posts, hasMore }
}
