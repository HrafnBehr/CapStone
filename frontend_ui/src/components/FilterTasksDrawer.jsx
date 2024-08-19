import {
  Drawer,
  Toolbar,
  Typography,
  Divider,
  Stack,
  Button,
  IconButton,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useState } from 'react'
import { ProjectAutocomplete } from './ProjectAutocomplete'
import { PathwayAutocomplete } from './PathwayAutocomplete'
import { MilestoneAutocomplete } from './MilestoneAutocomplete'
import { ActivityAutocomplete } from './ActivityAutocomplete'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function FilterTasksDrawer(props) {
  const [open, setOpen] = useState(false)

  const {
    selectedProjects,
    setSelectedProjects,
    selectedPathways,
    setSelectedPathways,
    selectedMilestones,
    setSelectedMilestones,
    selectedActivities,
    setSelectedActivities,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleFilter,
    handleClear,
  } = props

  const onFilter = () => {
    setOpen(!open)
    handleFilter()
  }

  const onClear = () => {
    setOpen(false)
    handleClear()
  }

  return (
    <>
      <IconButton onClick={() => setOpen(!open)}>
        <FilterListIcon />
      </IconButton>

      <Drawer open={open} onClose={() => setOpen(false)} anchor='right'>
        <Toolbar>
          <Typography variant='h6'>Filters</Typography>
        </Toolbar>
        <Divider />

        <Stack sx={{ width: 450, p: 2, flexGrow: 1 }} gap={2}>
          <div>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Projects
            </Typography>
            <ProjectAutocomplete
              selectedProjects={selectedProjects}
              setSelectedProjects={setSelectedProjects}
            />
          </div>

          <div>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Pathways
            </Typography>
            <PathwayAutocomplete
              selectedPathways={selectedPathways}
              setSelectedPathways={setSelectedPathways}
            />
          </div>

          <div>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Milestones
            </Typography>
            <MilestoneAutocomplete
              selectedMilestones={selectedMilestones}
              setSelectedMilestones={setSelectedMilestones}
            />
          </div>

          <div>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Activities
            </Typography>
            <ActivityAutocomplete
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
            />
          </div>

          <Stack>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Start Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Start date'
                value={startDate}
                slotProps={{
                  field: { clearable: true },
                }}
                onChange={setStartDate}
              />
            </LocalizationProvider>
          </Stack>

          <Stack>
            <Typography variant='body2' sx={{ mb: 1 }}>
              End Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='End date'
                value={endDate}
                slotProps={{
                  field: { clearable: true },
                }}
                onChange={setEndDate}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>

        <Stack direction='row' sx={{ p: 2, gap: 2 }}>
          <Button variant='outlined' onClick={onClear} fullWidth>
            Clear
          </Button>

          <Button variant='contained' onClick={onFilter} fullWidth>
            Apply
          </Button>
        </Stack>
      </Drawer>
    </>
  )
}
