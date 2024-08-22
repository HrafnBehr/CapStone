import {
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/users', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Container>
        <Typography variant='h4' gutterBottom>
          Users
        </Typography>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Program Manager</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Stack
                        direction='row'
                        gap={0.5}
                        alignItems='center'
                        justifyContent='center'
                      >
                        Loading...
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Stack
                        direction='row'
                        gap={0.5}
                        alignItems='center'
                        justifyContent='center'
                      >
                        There are no users
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.first_name}</TableCell>
                      <TableCell>{user.last_name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        {user.is_pm && <CheckCircleIcon color='success' />}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  )
}
