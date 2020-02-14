import NewsItem from './newsItem'
import useMyanmarNews from '../hooks/useMyanmarNews'

const MyanmarNews = () => {
  const news = useMyanmarNews()

  return (
    <div>
      {!news.length && <p>Fetching Myanmar news...</p>}
      {news.map(item => <NewsItem titleClassName='mm-font' key={item.url} {...item} />)}
    </div>
  )
}

export default MyanmarNews
