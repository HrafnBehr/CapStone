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

const MILESTONE_API = 'http://localhost:8080/api/v1/milestones'

const fetchMilestones = async () => {
  const response = await fetch(MILESTONE_API, {
    credentials: 'include',
  })

  return response.json()
}

export function MilestonePicker() {
  const [milestones, setMilestones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMilestones()
      .then((data) => setMilestones(data.milestones))
      .then(() => setLoading(false))
  }, [])

  return (
    <FormControl fullWidth>
      <InputLabel id='milestone-picker-label'>Milestone</InputLabel>
      <Select
        labelId='milestone-picker-label'
        label='Milestone'
        name='milestone_id'
        defaultValue=''
      >
        {loading ? (
          <MenuItem>Loading...</MenuItem>
        ) : (
          milestones.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}

export function MilestonePickerEnhanced(props) {
  const [milestones, setMilestones] = useState([])
  const [loading, setLoading] = useState(true)

  const { setSelectedMilestones, selectedMilestones } = props

  useEffect(() => {
    fetchMilestones()
      .then((data) => setMilestones(data.milestones))
      .then(() => setLoading(false))
  }, [])

  return (
    <Autocomplete
      multiple
      id='milestone'
      options={milestones}
      disableCloseOnSelect
      disabled={loading}
      clearOnBlur={false}
      value={selectedMilestones}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_event, value) => {
        setSelectedMilestones(value)
      }}
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
          label={loading ? 'Loading milestones...' : 'Milestone'}
          placeholder='Select milestones'
        />
      )}
    />
  )
}
