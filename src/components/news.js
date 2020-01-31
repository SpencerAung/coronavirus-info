import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

import NewsItem from './newsItem'

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

function useFetchedNews (fromDate) {
  const [news, updateNews] = useState([])

  useEffect(() => {
    async function fetchNews () {
      const fetched = await fetch(`https://newsapi.org/v2/top-headlines?sources=${SOURCES}&q=coronavirus&from=${fromDate}&sortBy=publishedAt&apiKey=${API_KEY}`)
      const result = await fetched.json()

      updateNews(result.articles)
    }

    fetchNews()
  }, [])
  return news
}

function getToday () {
  const today = new Date()
  let date = today.getDate()
  date = date > 9 ? date : `0${date}`

  let month = today.getMonth() + 1
  month = month > 9 ? month : `0${month}`

  return [today.getFullYear(), month, date].join('-')
}

const News = () => {
  const today = getToday()
  const fetchedNews = useFetchedNews(today)

  return (
    <div style={{ margin: '80rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>News</h1>
        <p>{today}</p>
      </div>
      {fetchedNews.map((article) => (
        <NewsItem key={article.publishedAt} {...article} />
      ))}
      <p>
        <small>Powered by: <a href='https://newsapi.org' target='blank' rel='nofollwer noreferer noopener'>NewsAPI.org</a></small>
      </p>
    </div>
  )
}

export default News
