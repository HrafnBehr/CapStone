import { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export function PathwaySelect(props) {
  const { pathwayId, setPathway } = props
  const [pathways, setPathways] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPathways() {
      const response = await fetch(`http://localhost:8080/api/v1/pathways`)
      const data = await response.json()
      setPathways(data.pathways)
      setLoading(false)
    }
    fetchPathways()
  }, [])

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor='pathway'>Pathway</InputLabel>
      <Select
        id='pathway'
        value={pathwayId}
        onChange={(e) => {
          setPathway(e)
        }}
      >
        {loading ? (
          <MenuItem>Loading...</MenuItem>
        ) : (
          pathways.map((pathway) => (
            <MenuItem key={pathway.id} value={pathway.id}>
              {pathway.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}
