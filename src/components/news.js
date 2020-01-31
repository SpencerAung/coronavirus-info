import { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import styled from '@emotion/styled'

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

function useFetchedNews (fromTime) {
  const [news, updateNews] = useState([])
  const fromDate = getFormattedDate(fromTime)

  useEffect(() => {
    async function fetchNews () {
      const fetched = await fetch(`https://newsapi.org/v2/top-headlines?sources=${SOURCES}&q=coronavirus&from=${fromDate}&sortBy=publishedAt&apiKey=${API_KEY}`)
      const result = await fetched.json()

      updateNews(result.articles)
    }

    updateNews([])
    fetchNews()
  }, [fromTime])

  return news
}

function getFormattedDate (today = new Date()) {
  let date = today.getDate()
  date = date > 9 ? date : `0${date}`

  let month = today.getMonth() + 1
  month = month > 9 ? month : `0${month}`

  return [today.getFullYear(), month, date].join('-')
}

const RefreshButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`

const News = () => {
  const [now, updateNow] = useState(new Date())
  const today = getFormattedDate(now)
  const fetchedNews = useFetchedNews(now)

  // TODO Add throttle/debounce
  const refreshNews = () => updateNow(new Date())

  return (
    <div style={{ margin: '80rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>News <RefreshButton onClick={refreshNews}>🔄</RefreshButton></h1>
        <p>{today}</p>
      </div>
      {!fetchedNews.length && (
        <div style={{ height: '300px' }}>
          <p style={{ textAlign: 'center' }}>Fetching latest news...</p>
        </div>
      )}
      {fetchedNews.map((article) => (
        <NewsItem key={article.urlToImage} {...article} />
      ))}
      <p>
        <small>Powered by: <a href='https://newsapi.org' target='_blank' rel='nofollw noreferrer noopener'>NewsAPI.org</a></small>
      </p>
    </div>
  )
}

export default News
