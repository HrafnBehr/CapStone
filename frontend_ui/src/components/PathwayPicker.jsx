import { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export function PathwayPicker(prps) {
  const [pathways, setPathways] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPathways() {
      const response = await fetch(`http://localhost:8080/api/v1/pathways`, {
        credentials: 'include',
      })
      const data = await response.json()
      setPathways(data.pathways)
      setLoading(false)
    }
    fetchPathways()
  }, [])

  return (
    <FormControl fullWidth>
      <InputLabel id='pathway-picker-label'>Pathway</InputLabel>
      <Select labelId='pathway-picker-label' label='Pathway' name='pathway_id'>
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
