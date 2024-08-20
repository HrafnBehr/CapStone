import { useEffect, useState } from 'react'
import {
  Autocomplete,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

const ACTIVITY_API = 'http://localhost:8080/api/v1/activities'

const fetchActivities = async () => {
  const response = await fetch(ACTIVITY_API, {
    credentials: 'include',
  })

  return response.json()
}

export function ActivityPicker() {
  const [activities, setActivites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
      .then((data) => setActivites(data.activities))
      .then(() => setLoading(false))
  }, [])

  return (
    <FormControl fullWidth>
      <InputLabel id='activity-picker-label'>Activity</InputLabel>
      <Select
        labelId='activity-picker-label'
        label='Activity'
        name='activity_id'
      >
        {loading ? (
          <MenuItem>Loading...</MenuItem>
        ) : (
          activities.map((a) => (
            <MenuItem key={a.id} value={a.id}>
              {a.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}

export function ActivityPickerEnhanced(props) {
  const [activities, setActivites] = useState([])
  const [loading, setLoading] = useState(true)

  const { setSelectedActivities, selectedActivities } = props

  useEffect(() => {
    fetchActivities()
      .then((data) => setActivites(data.activities))
      .then(() => setLoading(false))
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
