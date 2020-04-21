import NewsItem from './newsItem'
import PropTypes from 'prop-types'
import useApi from '../hooks/useApi'

const getNewsApiUrl = params => {
  return process.env.NEWS_API_ENDPOINT + '?' + Object.keys(params).map((key) =>
    `${key}=${params[key]}`).join('&')
}
const MyanmarNews = ({ title, pageSize, from, to }) => {
  const url = getNewsApiUrl({ pageSize, from, to })

  const { items = [] } = useApi(url, {})
  const news = items.map(item => ({
    url: item.url,
    title: item.title,
    id: item.id,
    source: item.siteName,
    date: item.publishedDate
  })
  )

  if (news.length === 0) {
    return null
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{title}</h1>
        <p>{from}</p>
      </div>
      {news.map(item => <NewsItem titleClassName='mm-font' key={item.id} {...item} />)}
    </div>
  )
}

MyanmarNews.propTypes = {
  title: PropTypes.string,
  pageSize: PropTypes.number,
  from: PropTypes.string,
  to: PropTypes.string
}

MyanmarNews.defaultProps = {
  title: '',
  pageSize: 20,
  from: '',
  to: ''
}

export default MyanmarNews
