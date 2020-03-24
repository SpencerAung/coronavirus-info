import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

export default function useMyanmarStatus (apiUrl, initialData) {
  const [data, updateData] = useState(initialData)

  useEffect(() => {
    async function fetchData () {
      try {
        const fetched = await fetch(apiUrl)
        const records = await fetched.json()

        updateData(records)
      } catch (e) {
      }
    }

    fetchData()
  }, [])

  return data
}
