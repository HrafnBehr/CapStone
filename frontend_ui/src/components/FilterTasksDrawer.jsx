import {
  Drawer,
  Toolbar,
  Typography,
  Divider,
  Stack,
  Button,
  IconButton,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useState } from 'react'
import { ActivityPickerEnhanced } from './ActivityPicker'
import { PathwayPickerEnhanced } from './PathwayPicker'
import { MilestonePickerEnhanced } from './MilestonePicker'
import { ProgramPickerEnhanced } from './ProgramPicker'

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
            <ProgramPickerEnhanced
              selectedProjects={selectedProjects}
              setSelectedProjects={setSelectedProjects}
            />
          </div>

          <div>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Pathways
            </Typography>
            <PathwayPickerEnhanced
              selectedPathways={selectedPathways}
              setSelectedPathways={setSelectedPathways}
            />
          </div>

          <div>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Milestones
            </Typography>
            <MilestonePickerEnhanced
              selectedMilestones={selectedMilestones}
              setSelectedMilestones={setSelectedMilestones}
            />
          </div>

          <div>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Activities
            </Typography>
            <ActivityPickerEnhanced
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
            />
          </div>

          <Stack>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Start Date
            </Typography>
            <DatePicker
              label='Start date'
              value={startDate}
              slotProps={{
                field: { clearable: true },
              }}
              onChange={setStartDate}
            />
          </Stack>

          <Stack>
            <Typography variant='body2' sx={{ mb: 1 }}>
              End Date
            </Typography>
            <DatePicker
              label='End date'
              value={endDate}
              slotProps={{
                field: { clearable: true },
              }}
              onChange={setEndDate}
            />
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
