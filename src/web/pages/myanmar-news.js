import MyanmarNews from '../components/myanmarNews'
import MyanmarStatus from '../components/myanmarStatus'

import { getFormattedDate } from '../helpers'

const MyanmarNewsPage = () => {
  const todayDateStr = getFormattedDate(new Date())
  const yesterday = new Date().setDate(new Date().getDate() - 1)
  const yesterdayDateStr = getFormattedDate(new Date(yesterday))

  return (
    <div>
      <MyanmarStatus />
      <MyanmarNews title='Today News' pageSize={100} from={todayDateStr} to={todayDateStr} />
      <MyanmarNews title='Yesterday News' pageSize={100} from={yesterdayDateStr} to={yesterdayDateStr} />
    </div>
  )
}

export default MyanmarNewsPage
