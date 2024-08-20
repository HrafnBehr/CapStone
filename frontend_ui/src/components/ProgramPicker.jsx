import { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export function ProgramPicker() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch(`http://localhost:8080/api/v1/projects`, {
        credentials: 'include',
      })
      const data = await response.json()
      setProjects(data.projects)
      setLoading(false)
    }
    fetchProjects()
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
