import NewsItem from './newsItem'
import useApi from '../hooks/useApi'

import { getFormattedDate } from '../helpers'
const MyanmarNews = () => {
  const tmrw = new Date().setDate(new Date().getUTCDate() + 1)
  const dateStr = getFormattedDate(new Date(tmrw))
  const { items = [] } = useApi(`https://due79jm6nb.execute-api.ap-southeast-1.amazonaws.com/v1/news/covid-19?pageSize=30&from=${dateStr}`, {})
  const news = items.map(item => ({
    url: item.url,
    title: item.title,
    id: item.id,
    source: (item.siteName || '').startsWith('7day') ? '7day News' : item.siteName,
    date: item.publishedDate
  })
  )

  return (
    <div>
      <h1 className='mm-font'>သတင်း</h1>
      {!news.length && <p>Fetching Myanmar news...</p>}
      {news.map(item => <NewsItem titleClassName='mm-font' key={item.id} {...item} />)}
    </div>
  )
}

export default MyanmarNews
