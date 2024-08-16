import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '@mui/material'

export function Logout() {
  const { setIsAuthenticated } = useAuth()
  const navigate = useNavigate()

  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      type='button'
      onClick={async () => {
        const res = await fetch('http://localhost:8080/api/v1/auth/logout', {
          method: 'POST',
          credentials: 'include',
        })

        if (res.ok) {
          setIsAuthenticated(false)
          navigate('/')
        }
      }}
    >
      Logout
    </Button>
  )
}