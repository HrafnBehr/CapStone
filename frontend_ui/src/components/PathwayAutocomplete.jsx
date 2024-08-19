import { useEffect, useState } from 'react'
import { Autocomplete, TextField, Checkbox } from '@mui/material'

export function PathwayAutocomplete(props) {
  const [pathways, setPathways] = useState([])
  const [loading, setLoading] = useState(true)

  const { selectedPathways, setSelectedPathways } = props

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
    <Autocomplete
      multiple
      id='pathway'
      options={pathways}
      disableCloseOnSelect
      disabled={loading}
      clearOnBlur={false}
      value={selectedPathways}
      onChange={(_event, value) => setSelectedPathways(value)}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props
        return (
          <li key={key} {...optionProps}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.name}
          </li>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          label={loading ? 'Loading pathways...' : 'Pathway'}
          placeholder='Select pathways'
        />
      )}
    />
  )
}
