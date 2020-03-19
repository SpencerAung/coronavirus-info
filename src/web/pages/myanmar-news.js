import MyanmarNews from '../components/myanmarNews'
import MyanmarStatus from '../components/myanmarStatus'

const MyanmarNewsPage = () => {
  return (
    <div>
      <MyanmarStatus />
      <h1 className='mm-font'>မြန်မာသတင်း</h1>
      <MyanmarNews />
    </div>
  )
}

export default MyanmarNewsPage
