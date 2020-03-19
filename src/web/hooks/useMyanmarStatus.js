import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

export default function useMyanmarStatus () {
  const [statuses, updateStatuses] = useState([])

  useEffect(() => {
    async function fetchStatuses () {
      try {
        const fetched = await fetch('/api/myanmar-status')
        const records = await fetched.json()

        updateStatuses(records)
      } catch (e) {
      }
    }

    fetchStatuses()
  }, [])

  return statuses
}
