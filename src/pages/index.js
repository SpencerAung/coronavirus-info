import StatusTable from '../components/statusTable'
import News from '../components/news'

function HomePage () {
  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#6246ea' }}>🦠 Coronavirus Info</h1>
      <StatusTable />
      <News />
    </>
  )
}

export default HomePage
