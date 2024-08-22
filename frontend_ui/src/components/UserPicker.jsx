import { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export function UserPicker({ label, is_pm }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const queryParams = new URLSearchParams()
      if (is_pm) {
        queryParams.append('is_pm', is_pm)
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/users?${queryParams.toString()}`,
        {
          credentials: 'include',
        },
      )
      const data = await response.json()
      setUsers(data.users)
      setLoading(false)
    }
    fetchProjects()
  }, [is_pm])

  return (
    <FormControl fullWidth>
      <InputLabel id={`user-label-${label}`}>{label}</InputLabel>
      <Select
        name='user_id'
        labelId={`user-label-${label}`}
        label={label}
        defaultValue=''
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
