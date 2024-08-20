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

const PROJECTS_API = 'http://localhost:8080/api/v1/projects'

const fetchProjects = async () => {
  const response = await fetch(PROJECTS_API, {
    credentials: 'include',
  })

  return response.json()
}

export function ProgramPicker() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data.projects))
      .then(() => setLoading(false))
  }, [])

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor='project'>Project</InputLabel>
      <Select id='project' name='project_id'>
        {loading ? (
          <MenuItem>Loading...</MenuItem>
        ) : (
          projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}

export function ProgramPickerEnhanced(props) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const { setSelectedProjects, selectedProjects } = props

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data.projects))
      .then(() => setLoading(false))
  }, [])

  return (
    <Autocomplete
      multiple
      id='project'
      options={projects}
      disableCloseOnSelect
      disabled={loading}
      clearOnBlur={false}
      value={selectedProjects}
      getOptionLabel={(option) => option.name}
      onChange={(_event, newValue) => {
        setSelectedProjects(newValue)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props
        return (
          <li key={key} {...optionProps} data-option={JSON.stringify(option)}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.name}
          </li>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          label={loading ? 'Loading projects...' : 'Project'}
          placeholder='Select projects'
        />
      )}
    />
  )
}
