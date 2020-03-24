import NewsItem from './newsItem'
import useApi from '../hooks/useApi'

const MyanmarNews = () => {
  const news = useApi('/api/myanmar-news', [])

  return (
    <div>
      <h1 className='mm-font'>သတင်း</h1>
      {!news.length && <p>Fetching Myanmar news...</p>}
      {news.map(item => <NewsItem titleClassName='mm-font' key={item.url} {...item} />)}
    </div>
  )
}

export default MyanmarNews
