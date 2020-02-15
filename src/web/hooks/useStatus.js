import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

export default function useStatus () {
  const [status, updateStatus] = useState([])

  useEffect(() => {
    async function fetchStatus () {
      try {
        const fetched = await fetch('/api/status')
        const result = await fetched.json()

        updateStatus(result)
      } catch (e) {
      }
    }

    fetchStatus()
  }, [])

  return status
}
