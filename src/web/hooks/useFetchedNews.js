import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

import { getFormattedDate } from '../helpers'

const API_KEY = '894616ef9e184b438defe23419455060'
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
        const fetched = await fetch(`https://newsapi.org/v2/top-headlines?sources=${SOURCES}&q=coronavirus&from=${fromDate}&sortBy=publishedAt&apiKey=${API_KEY}`)
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
