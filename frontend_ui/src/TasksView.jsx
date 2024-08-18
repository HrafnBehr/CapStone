import { ProjectAutocomplete } from './components/ProjectAutocomplete'
import { PathwayAutocomplete } from './components/PathwayAutocomplete'
import { MilestoneAutocomplete } from './components/MilestoneAutocomplete'
import { ActivityAutocomplete } from './components/ActivityAutocomplete'
import {
  Card,
  CardContent,
  Container,
  Button,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

export default function TasksView() {
  const [selectedPathways, setSelectedPathways] = useState([])
  const [selectedMilestones, setSelectedMilestones] = useState([])
  const [selectedActivities, setSelectedActivities] = useState([])
  const [selectedProjects, setSelectedProjects] = useState([])
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(dayjs().add(1, 'month'))

  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchCurrentMonthTasks = async () => {
      const res = await fetch(`http://localhost:8080/api/v1/tasks`)
      const data = await res.json()

      setTasks(data.tasks)
      setLoading(false)
    }

    fetchCurrentMonthTasks()
  }, [])

  const handleFilter = async (e) => {
    e.preventDefault()

    setLoading(true)

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

    const search = queryParams.toString()

    const res = await fetch(`http://localhost:8080/api/v1/tasks?${search}`)
    const data = await res.json()

    setTasks(data.tasks)
    setLoading(false)
  }

  return (
    <Container>
      <h1>Filter View</h1>

      <Paper>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell padding='checkbox'>
                    <Checkbox color='primary' />
                  </TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.start_date}</TableCell>
                  <TableCell>{task.end_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Card variant='outlined'>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ProjectAutocomplete setSelectedProjects={setSelectedProjects} />
            </Grid>

            <Grid item xs={6}>
              <PathwayAutocomplete setSelectedPathways={setSelectedPathways} />
            </Grid>

            <Grid item xs={6}>
              <MilestoneAutocomplete
                setSelectedMilestones={setSelectedMilestones}
              />
            </Grid>

            <Grid item xs={6}>
              <ActivityAutocomplete
                setSelectedActivities={setSelectedActivities}
              />
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Start date'
                  value={startDate}
                  onChange={(v) => {
                    if (dayjs(v).isAfter(endDate)) {
                      setEndDate(dayjs(v).add(1, 'month'))
                    }

                    setStartDate(dayjs(v))
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='End date'
                  value={endDate}
                  onChange={(v) => {
                    if (dayjs(v).isBefore(startDate)) {
                      alert('End date should be after start date')
                    } else {
                      setEndDate(dayjs(v))
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Button variant='contained' onClick={handleFilter} fullWidth>
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {loading && <p>Loading...</p>}

      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      ) : (
        <p>No tasks found</p>
      )}
    </Container>
  )
}
