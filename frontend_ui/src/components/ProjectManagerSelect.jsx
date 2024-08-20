import { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export function ProjectManagerSelect(props) {
  const { projectManagerId, setProjectManager } = props
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPathways() {
      const response = await fetch(
        `http://localhost:8080/api/v1/users?is_pm=true`,
        {
          credentials: 'include',
        },
      )
      const data = await response.json()
      setUsers(data.users)
      setLoading(false)
    }
    fetchPathways()
  }, [])

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor='pathway'>Project Manager</InputLabel>
      <Select
        id='project_manager'
        value={projectManagerId || ''}
        onChange={(e) => setProjectManager(e)}
      >
        {loading ? (
          <MenuItem>Loading...</MenuItem>
        ) : (
          users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.first_name} {user.last_name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}
