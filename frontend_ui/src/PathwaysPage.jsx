import {
  Container,
  Link,
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
import { useEffect, useMemo, useState } from 'react'
import { useSearch } from './hooks/useSearch'
import { NavLink } from 'react-router-dom'

export default function PathwaysPage() {
  const [pathways, setPathways] = useState([])
  const [loading, setLoading] = useState(true)
  const { search } = useSearch()

  const filteredPathways = useMemo(() => {
    return pathways.filter((pathway) =>
      pathway.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search, pathways])

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/pathways', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setPathways(data.pathways)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Container>
        <Typography variant='h4' gutterBottom>
          Pathways
        </Typography>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Pathway</TableCell>
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
                ) : filteredPathways.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Stack
                        direction='row'
                        gap={0.5}
                        alignItems='center'
                        justifyContent='center'
                      >
                        There are no pathways
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPathways.map((pathway) => (
                    <TableRow key={pathway.id} hover>
                      <TableCell>{pathway.id}</TableCell>
                      <TableCell>
                        <Link component={NavLink} to={pathway.id.toString()}>
                          {pathway.name}
                        </Link>
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
