import {
  Box,
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
import { NavLink, useParams, Link as RouterLink } from 'react-router-dom'

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState([])
  const [loading, setLoading] = useState(true)
  const { search } = useSearch()
  const { pathwayId } = useParams()

  const filteredMilestones = useMemo(() => {
    return milestones.filter((milestone) =>
      milestone.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search, milestones])

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/milestones?pathway_id=${pathwayId}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setMilestones(data.milestones)
        setLoading(false)
      })
  }, [pathwayId])

  return (
    <>
      <Container>
        <Box sx={{ mb: 2 }}>
          <Link component={RouterLink} to='/admin/pathways'>
            Back to Pathways
          </Link>
        </Box>

        <Typography variant='h4' gutterBottom>
          Milestones
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
                ) : filteredMilestones.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Stack
                        direction='row'
                        gap={0.5}
                        alignItems='center'
                        justifyContent='center'
                      >
                        There are no milestones
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMilestones.map((milestone) => (
                    <TableRow key={milestone.id} hover>
                      <TableCell>{milestone.id}</TableCell>
                      <TableCell>
                        <Link
                          component={NavLink}
                          to={`milestones/${milestone.id}`}
                        >
                          {milestone.name}
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
