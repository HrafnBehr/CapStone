import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  Stack,
  Typography,
  Box,
} from '@mui/material'
import { useState } from 'react'
import dayjs from 'dayjs'
import FilterListIcon from '@mui/icons-material/FilterList'
import { FilterTasksDrawer } from './components/FilterTasksDrawer'

export default function TasksView() {
  const [selectedPathways, setSelectedPathways] = useState([])
  const [selectedMilestones, setSelectedMilestones] = useState([])
  const [selectedActivities, setSelectedActivities] = useState([])
  const [selectedProjects, setSelectedProjects] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])

  const handleFilter = async () => {
    setLoading(true)
    setTasks([])

    const queryParams = new URLSearchParams()

    selectedProjects.forEach((project) =>
      queryParams.append('project_id', project.id),
    )

    selectedPathways.forEach((pathway) =>
      queryParams.append('pathway_id', parseInt(pathway.id)),
    )

    selectedMilestones.forEach((milestone) =>
      queryParams.append('milestone_id', milestone.id),
    )

    selectedActivities.forEach((activity) =>
      queryParams.append('activity_id', activity.id),
    )

    if (startDate) {
      queryParams.append('start_date', dayjs(startDate).toISOString())
    }

    if (endDate) {
      queryParams.append('end_date', dayjs(endDate).toISOString())
    }

    const search = queryParams.toString()

    const res = await fetch(`http://localhost:8080/api/v1/tasks?${search}`, {
      credentials: 'include',
    })
    const data = await res.json()

    setTasks(data.tasks)
    setLoading(false)
  }

  const handleClear = () => {
    setSelectedProjects([])
    setSelectedPathways([])
    setSelectedMilestones([])
    setSelectedActivities([])
    setStartDate(null)
    setEndDate(null)
    setTasks([])
  }

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Tasks
      </Typography>

      <Paper>
        <Stack direction='row' sx={{ p: 2 }} gap={2}>
          <Box sx={{ flexGrow: 1 }} />

          <FilterTasksDrawer
            selectedProjects={selectedProjects}
            setSelectedProjects={setSelectedProjects}
            selectedPathways={selectedPathways}
            setSelectedPathways={setSelectedPathways}
            selectedMilestones={selectedMilestones}
            setSelectedMilestones={setSelectedMilestones}
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleFilter={handleFilter}
            handleClear={handleClear}
          />
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox color='primary' />
                </TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Program</TableCell>
                <TableCell>Pathway</TableCell>
                <TableCell>Milestone</TableCell>
                <TableCell>Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>
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
              ) : tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Stack
                      direction='row'
                      gap={0.5}
                      alignItems='center'
                      justifyContent='center'
                    >
                      Click the <FilterListIcon /> to filter tasks.
                    </Stack>
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => (
                  <TableRow key={task.id} hover>
                    <TableCell padding='checkbox'>
                      <Checkbox color='primary' />
                    </TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>
                      {dayjs(task.start_date).format('MM-DD-YYYY')}
                    </TableCell>
                    <TableCell>
                      {dayjs(task.end_date).format('MM-DD-YYYY')}
                    </TableCell>
                    <TableCell>{task.project.name}</TableCell>
                    <TableCell>{task.pathway.name}</TableCell>
                    <TableCell>{task.milestone.name}</TableCell>
                    <TableCell>{task.activity.name}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}
