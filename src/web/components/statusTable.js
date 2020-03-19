import { useState, useEffect } from 'react'
import { IoIosBookmark as AddIcon } from 'react-icons/io'
import BeatLoader from 'react-spinners/BeatLoader'

import theme from '../theme'
import Summary from './summary'
import useApiData from '../hooks/useApiData'
import { toLocaleString } from '../helpers'
import { SpinnerWrapper, HeaderTable, SearchInput, DataTable, TableWrapper, BookmarkButton, BookmarkSwitchButton, SearchInputWrapper } from './statusTable.style'

const DataRows = ({ data = [], bookmarks, onBookmarksChange }) => {
  return data.map(({
    country,
    confirmed,
    recovered,
    deaths,
    changeInConfirmed,
    changeInRecovered,
    changeInDeaths,
    previous
  }) => {
    const confirmedTdClassName = confirmed ? 'confirmed-col' : 'confirmed-col zero-case '
    const recoveredTdClassName = recovered ? 'recovered-col' : 'recovered-col zero-case '
    const deathsTdClassName = deaths ? 'deaths-col' : 'deaths-col zero-case '

    return (
      <tr key={country}>
        <td className='country-col'>{country} {!previous && <small><span className='danger'>new</span></small>}</td>
        <td className={confirmedTdClassName}>
          <span>{toLocaleString(confirmed)}</span>
          {changeInConfirmed > 0 && <><br /><span className='change danger'>+({toLocaleString(changeInConfirmed)})</span></>}
        </td>
        <td className={recoveredTdClassName}>
          <span>{toLocaleString(recovered)}</span>
          {changeInRecovered > 0 && <><br /><span className='change highlight'>+({toLocaleString(changeInRecovered)})</span></>}
        </td>
        <td className={deathsTdClassName}>
          <span>{toLocaleString(deaths)}</span>
          {changeInDeaths > 0 && <><br /><span className='change danger'>+({toLocaleString(changeInDeaths)})</span></>}
        </td>
        <td className='action-col'><BookmarkButton onClick={() => onBookmarksChange(country)} active={bookmarks[country]}><AddIcon /></BookmarkButton></td>
      </tr>
    )
  })
}

const saveBookmarksToLocalStorage = (bookmarks) => {
  window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

const StatusTable = () => {
  const fetchedData = useApiData()
  const [bookmarks, setBookmarks] = useState({})
  const [isBookmarkOn, turnOnBookmark] = useState(false)
  const [keyword, setKeyword] = useState('')

  const addBookmarks = (country) => {
    const newRecord = {
      [country]: bookmarks[country] ? !bookmarks[country] : true
    }
    const newList = { ...bookmarks, ...newRecord }
    setBookmarks(newList)
    saveBookmarksToLocalStorage(newList)
  }

  useEffect(() => {
    let list = JSON.parse(window.localStorage.getItem('bookmarks'))
    if (!list) {
      list = {}
    }

    setBookmarks(list)
  }, [])

  if (!fetchedData.length) {
    return (
      <SpinnerWrapper>
        <BeatLoader
          color={theme.colors.purple}
        />
      </SpinnerWrapper>
    )
  }

  const visibleData = isBookmarkOn ? fetchedData.filter(record => bookmarks[record.country] || false) : fetchedData
  const records = keyword.length ? visibleData.filter(record => record.country.toLowerCase().startsWith(keyword.toLowerCase())) : visibleData

  return (
    <div>
      <Summary data={fetchedData} />
      {fetchedData.length > 0 && (
        <TableWrapper>
          <SearchInputWrapper>
            <SearchInput type='text' onChange={e => setKeyword(e.target.value)} placeholder='Search country' />
          </SearchInputWrapper>
          <HeaderTable>
            <thead>
              <tr>
                <th className='country-col'>Country</th>
                <th className='confirmed-col'>Confirmed</th>
                <th className='recovered-col'>Recovered</th>
                <th className='deaths-col'>Deaths</th>
                <th className='action-col'><BookmarkSwitchButton onClick={() => turnOnBookmark(!isBookmarkOn)} active={isBookmarkOn}><AddIcon /></BookmarkSwitchButton></th>
              </tr>
            </thead>
          </HeaderTable>
          <DataTable>
            <tbody>
              <DataRows data={records} bookmarks={bookmarks} onBookmarksChange={addBookmarks} />
            </tbody>
          </DataTable>
          <p>
            <small>
        Data source: <a href='https://docs.google.com/spreadsheets/d/1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM/htmlview?usp=sharing&sle=true' target='_blank' rel='noreferrer nofollow noopener'>Novel Coronavirus (2019-nCoV) Cases, provided by JHU CSSE</a>
            </small>
          </p>
        </TableWrapper>
      )}
    </div>
  )
}

export default StatusTable
