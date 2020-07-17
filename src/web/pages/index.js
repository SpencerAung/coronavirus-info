import StatusTable from '../components/statusTable'
import News from '../components/news'
import StatusContext from '../context/statusContext'

function HomePage () {
  return (
    <>
      <StatusContext.Consumer>
        {(fetchedData) => <StatusTable fetchedData={fetchedData} />}
      </StatusContext.Consumer>
      <News />
    </>
  )
}

export default HomePage
