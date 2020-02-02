import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

export default function useMyanmarNews () {
  const [news, updateNews] = useState([])

  useEffect(() => {
    async function fetchNews () {
      const fetched = await fetch('/api/myanmar-news')
      const records = await fetched.json()

      updateNews(records)
    }

    fetchNews()
  }, [])

  return news
}
