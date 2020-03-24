import useApi from '../hooks/useApi'
import { Wrapper, NoteWrapper, Flex, Card } from './summary.style'
import Spinner from './spinner'

const MyanmarStatus = () => {
  const [data] = useApi('/api/myanmar-status', [])

  if (!data) {
    return <Spinner />
  }

  const lastUpdated = new Date(data.updatedAt).toUTCString()

  return (
    <Wrapper style={{ marginBottom: '80rem' }}>
      <h1 style={{ textAlign: 'center' }} className='mm-font'>မြန်မာ Status</h1>
      <Flex>
        <Card>
          <div className='label mm-font'>စောင့်ကြည့်လူနာ</div>
          <div className='number info'>{data.underInvestigation}</div>
        </Card>
        <Card>
          <div className='label mm-font'>သံသယလူနာ</div>
          <div className='number info'>{data.suspected}</div>
        </Card>
      </Flex>
      <Flex>
        <Card>
          <div className='label mm-font'>စောင့်ကြည့်/သံသယလူနာစုစုပေါင်း</div>
          <div className='number info'>{data.underInvestigation + data.suspected}</div>
        </Card>
        <Card>
          <div className='label mm-font'>ဓာတ်ခွဲအဖြေစောင့်ဆိုင်းဆဲ</div>
          <div className='number info'>{data.pending}</div>
        </Card>
      </Flex>
      <Flex>
        <Card>
          <div className='label mm-font'>ပိုးတွေ့လူနာ</div>
          <div className='number danger'>{data.confirmed}</div>
        </Card>
        <Card>
          <div className='label mm-font'>ပိုးမတွေ့လူနာ</div>
          <div className='number highlight'>{data.negative}</div>
        </Card>
      </Flex>
      <NoteWrapper>
        <p>
          <small>
            <span>Updated on:</span>
            <span> {lastUpdated}</span>
          </small>
        </p>
        <p>
          <small>
            <span>Data source: </span>
            <a href='https://doph.maps.arcgis.com/apps/opsdashboard/index.html#/f8fb4ccc3d2d42c7ab0590dbb3fc26b8' target='_blank' rel='nofollow noopener noreferrer'>Coronavirus Disease 2019 (COVID-19) Surveillance Dashboard (Myanmar)</a>{', '}
            <a href='https://www.facebook.com/MinistryOfHealthAndSportsMyanmar/' target='_blank' rel='nofollow noopener noreferrer'>Ministry of Health and Sports, Myanmar</a>

          </small>
        </p>
      </NoteWrapper>
    </Wrapper>
  )
}

export default MyanmarStatus
