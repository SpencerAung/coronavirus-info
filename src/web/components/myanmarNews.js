import { useEffect, useReducer } from 'react'
import fetch from 'node-fetch'
import styled from '@emotion/styled'

import NewsItem from './newsItem'
import PropTypes from 'prop-types'
import Spinner from './spinner'

const FilterButton = styled.button`
  margin: 5rem;
  border: none;
  color: #fff;
  background-color: ${props => props.active ? props.theme.colors.pink : props.theme.colors.offWhite};
  cursor: pointer;
`

const getNewsApiUrl = params => {
  return process.env.NEWS_API_ENDPOINT + '?' + Object.keys(params).map((key) =>
    `${key}=${params[key]}`).join('&')
}

const initialState = {
  news: [],
  totalItems: 0,
  fetched: false,
  filter: 'all'
}

function reducer (state, action) {
  switch (action.type) {
    case 'NEWS_FETCHED':
      return { ...state, news: action.news, totalItems: action.totalItems, fetched: true }
    case 'TOGGLE_FILTER':
      return { ...state, filter: action.filter }
    default:
      return state
  }
}

const filterButtons = [
  { id: 'all', title: 'All' },
  { id: '7day-news', title: '7Day News' },
  { id: 'burma-irrawaddy', title: 'Irrawaddy' },
  { id: 'eleven-media-group', title: 'Eleven Media Group' },
  { id: 'myanmar-mm-times', title: 'The Myanmar Times' }
]

const MyanmarNews = ({ title, pageSize, from, to }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchNews () {
      const url = getNewsApiUrl({ pageSize, from, to })
      const res = await fetch(url)
      const { items, totalItems } = await res.json()

      dispatch({
        type: 'NEWS_FETCHED',
        fetched: true,
        news: items.map(item => ({
          url: item.url,
          title: item.title,
          id: item.id,
          source: item.siteName,
          sourceId: item.sourceId,
          date: item.publishedDate
        })
        ),
        totalItems
      })
    }

    fetchNews()
  }, [])

  const { news, totalItems, fetched, filter } = state

  const filteredNews = filter === 'all' ? news : news.filter(item => item.sourceId === filter)
  const toggleFilter = (e) => {
    dispatch({
      type: 'TOGGLE_FILTER',
      filter: e.target.id
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{title}</h1>
        <p>{from}</p>
      </div>
      <div>
        {filterButtons.map(btn => (
          <FilterButton key={btn.id} id={btn.id} active={filter === btn.id} onClick={toggleFilter}>{btn.title}</FilterButton>
        ))}
      </div>
      {!fetched && <Spinner />}
      {fetched && totalItems === 0 && <p>No news yet. Please come back later or refresh the page.</p>}
      {filteredNews.map(item => <NewsItem titleClassName='mm-font' key={item.id} {...item} />)}
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
