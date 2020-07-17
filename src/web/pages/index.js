import StatusTable from '../components/statusTable'
import StatusContext from '../context/statusContext'

function HomePage () {
  return (
    <>
      <StatusContext.Consumer>
        {(fetchedData) => <StatusTable fetchedData={fetchedData} />}
      </StatusContext.Consumer>
    </>
  )
}

export default HomePage
