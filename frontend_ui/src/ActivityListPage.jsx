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
import { useParams, Link as RouterLink } from 'react-router-dom'

export default function ActivityListPage() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const { search } = useSearch()
  const { pathwayId, milestoneId } = useParams()

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) =>
      activity.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search, activities])

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/activities?pathway_id=${pathwayId}&milestone_id=${milestoneId}`,
      {
        credentials: 'include',
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setActivities(data.activities)
        setLoading(false)
      })
  }, [pathwayId, milestoneId])

  return (
    <>
      <Container>
        <Box sx={{ mb: 2 }}>
          <Link component={RouterLink} to={`/admin/pathways/${pathwayId}`}>
            Back to Milestones
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
                ) : filteredActivities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Stack
                        direction='row'
                        gap={0.5}
                        alignItems='center'
                        justifyContent='center'
                      >
                        There are no activities
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredActivities.map((activity) => (
                    <TableRow key={activity.id} hover>
                      <TableCell>{activity.id}</TableCell>
                      <TableCell>{activity.name}</TableCell>
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
