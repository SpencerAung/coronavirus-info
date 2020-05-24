import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

import { getFormattedDate } from '../helpers'

const SOURCES = [
  'abc-news',
  'abc-news-au',
  'al-jazeera-english',
  'bbc-news',
  'cnn',
  'google-news',
  'reuters',
  'the-times-of-india',
  'time',
  'cbc-news',
  'cbs-news',
  'fox-news',
  'independent',
  'medical-news-today',
  'msnbc'
].join(',')

export default function useFetchedNews (fromTime) {
  const [news, updateNews] = useState([])
  const fromDate = getFormattedDate(fromTime)

  useEffect(() => {
    async function fetchNews () {
      try {
        const fetched = await fetch(`https://newsapi.org/v2/top-headlines?sources=${SOURCES}&q=covid&from=${fromDate}&sortBy=publishedAt`,
          { headers: { 'X-Api-Key': process.env.NEWS_API_KEY } }
        )

        const result = await fetched.json()

        updateNews(result.articles)
      } catch (e) {
      }
    }

    updateNews([])
    fetchNews()
  }, [fromTime])

  return news
}
