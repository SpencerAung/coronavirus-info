import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

export default function useApiData () {
  const [data, updateData] = useState([])

  useEffect(() => {
    async function fetchData () {
      try {
        const fetched = await fetch(process.env.API_ENDPOINT)
        const result = await fetched.json()

        updateData(result.data)
      } catch (e) {

      }
    }
    fetchData()
  }, [])

  return data
}
