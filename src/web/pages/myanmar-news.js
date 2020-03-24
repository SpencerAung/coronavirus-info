import MyanmarNews from '../components/myanmarNews'
import MyanmarStatus from '../components/myanmarStatus'
import PatientPath from '../components/patientPath'

const MyanmarNewsPage = () => {
  return (
    <div>
      <MyanmarStatus />
      <PatientPath />
      <h1 className='mm-font'>မြန်မာသတင်း</h1>
      <MyanmarNews />
    </div>
  )
}

export default MyanmarNewsPage
