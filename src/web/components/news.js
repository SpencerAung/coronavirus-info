import styled from '@emotion/styled'
import { useState } from 'react'

import NewsItem from './newsItem'
import { getFormattedDate } from '../helpers'
import useFetchedNews from '../hooks/useFetchedNews'

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
        <NewsItem key={article.urlToImage} {...article} source={article.source.name} />
      ))}
      <p>
        <small>Powered by: <a href='https://newsapi.org' target='_blank' rel='nofollw noreferrer noopener'>NewsAPI.org</a></small>
      </p>
    </div>
  )
}

export default News
