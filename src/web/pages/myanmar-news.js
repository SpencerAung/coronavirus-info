import MyanmarNews from '../components/myanmarNews'
import MyanmarStatus from '../components/myanmarStatus'
import PatientPath from '../components/patientPath'

import { getFormattedDate } from '../helpers'

const MyanmarNewsPage = () => {
  const todayDateStr = getFormattedDate(new Date())
  const yesterday = new Date().setDate(new Date().getUTCDate() - 1)
  const yesterdayDateStr = getFormattedDate(new Date(yesterday))

  return (
    <div>
      <MyanmarStatus />
      <PatientPath />
      <MyanmarNews title='Today News' pageSize={100} from={todayDateStr} to={todayDateStr} />
      <MyanmarNews title='Yesterday News' pageSize={100} from={yesterdayDateStr} to={yesterdayDateStr} />
    </div>
  )
}

export default MyanmarNewsPage
