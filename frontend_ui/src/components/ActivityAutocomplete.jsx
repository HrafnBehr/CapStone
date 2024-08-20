import { useEffect, useState } from 'react'
import { Autocomplete, TextField, Checkbox } from '@mui/material'

export function ActivityAutocomplete(props) {
  const [activities, setActivites] = useState([])
  const [loading, setLoading] = useState(true)

  const { setSelectedActivities, selectedActivities } = props

  useEffect(() => {
    async function fetchActivities() {
      const response = await fetch(`http://localhost:8080/api/v1/activities`, {
        credentials: 'include',
      })
      const data = await response.json()
      setActivites(data.activities)
      setLoading(false)
    }
    fetchActivities()
  }, [])

  return (
    <Autocomplete
      multiple
      id='activity'
      options={activities}
      disableCloseOnSelect
      disabled={loading}
      onChange={(_event, value) => setSelectedActivities(value)}
      getOptionLabel={(option) => option.name}
      clearOnBlur={false}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedActivities}
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
          label={loading ? 'Loading activities...' : 'Activity'}
          placeholder='Select activities'
        />
      )}
    />
  )
}
