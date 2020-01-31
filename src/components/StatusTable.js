import data from '../data'

const StatusTable = () => {
  const infectedCountries = data.length
  const { totalInfected, totalDeaths } = data.reduce((acc, cur) => {
    acc.totalInfected = acc.totalInfected + cur.infected || cur.infected
    acc.totalDeaths = acc.totalDeaths + cur.deaths || cur.deaths

    return acc
  }, {})
  return (
    <div
      style={{
        width: '300px',
        margin: '0 auto'
      }}
    >
      <div>
        <p>Infected Countries: {infectedCountries}</p>
        <p>Total Infected: {totalInfected}</p>
        <p>Total Deaths: {totalDeaths}</p>
      </div>
      <table>
        <thead>
          <tr>
            <td>Country</td>
            <td>Infected</td>
            <td>Deaths</td>
          </tr>
        </thead>
        <tbody>
          {data.map(({ country, infected, deaths }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>{infected}</td>
              <td>{deaths}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StatusTable
