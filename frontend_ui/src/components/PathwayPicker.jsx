import { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material'

const PATHWAY_API = 'http://localhost:8080/api/v1/pathways'

const fetchPathways = async () => {
  const response = await fetch(PATHWAY_API, {
    credentials: 'include',
  })

  return response.json()
}

export function PathwayPicker({ defaultValue = '', disabled = false }) {
  const [pathways, setPathways] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPathways()
      .then((data) => setPathways(data.pathways))
      .then(() => setLoading(false))
  }, [])

  return (
    <FormControl fullWidth>
      <InputLabel id='pathway-picker-label'>Pathway</InputLabel>
      <Select
        labelId='pathway-picker-label'
        label='Pathway'
        name='pathway_id'
        defaultValue={defaultValue}
        disabled={disabled}
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

export function PathwayPickerEnhanced(props) {
  const [pathways, setPathways] = useState([])
  const [loading, setLoading] = useState(true)

  const { selectedPathways, setSelectedPathways } = props

  useEffect(() => {
    fetchPathways()
      .then((data) => setPathways(data.pathways))
      .then(() => setLoading(false))
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
      isOptionEqualToValue={(option, value) => option.id === value.id}
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
