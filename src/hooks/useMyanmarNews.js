import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

export default function useMyanmarNews () {
  const [news, updateNews] = useState([])

  useEffect(() => {
    async function fetchNews () {
      try {
        const fetched = await fetch('/api/myanmar-news')
        const records = await fetched.json()

        updateNews(records)
      } catch (e) {
      }
    }

    fetchNews()
  }, [])

  return news
}
