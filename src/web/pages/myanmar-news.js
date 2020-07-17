import MyanmarNews from '../components/myanmarNews'
import MyanmarStatus from '../components/myanmarStatus'
import MinistryFbPage from '../components/ministryFbPage'

import { getFormattedDate } from '../helpers'
import StatusContext from '../context/statusContext'

const MyanmarNewsPage = () => {
  const todayDateStr = getFormattedDate(new Date())
  const yesterday = new Date().setDate(new Date().getDate() - 1)
  const yesterdayDateStr = getFormattedDate(new Date(yesterday))

  return (
    <div>
      <StatusContext.Consumer>
        {(fetchedData) => <MyanmarStatus fetchedData={fetchedData} />}
      </StatusContext.Consumer>
      <MyanmarNews
        title='Today News'
        pageSize={100}
        from={todayDateStr}
        to={todayDateStr}
      />
      <MyanmarNews
        title='Yesterday News'
        pageSize={100}
        from={yesterdayDateStr}
        to={yesterdayDateStr}
      />
      <MinistryFbPage />
    </div>
  )
}

export default MyanmarNewsPage
