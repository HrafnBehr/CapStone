import { Chip } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import dayjs from 'dayjs'
import dayjsUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsUTC)

export function ProgramStatusChip(props) {
  const { project } = props

  const daysLeft = dayjs(project.end_date)
    .utc()
    .diff(dayjs(project.start_date).utc(), 'days')
  const status = daysLeft > 0 ? 'On-time' : 'Delayed'

  const icon = <AccessTimeIcon />

  if (daysLeft < 0) {
    return (
      <>
        <Chip
          icon={icon}
          size='small'
          color='error'
          label={`${Math.abs(daysLeft)} days overdue`}
          sx={{ userSelect: 'none' }}
        />
      </>
    )
  } else if (daysLeft >= 0 && daysLeft < 90) {
    return (
      <>
        <Chip
          icon={icon}
          size='small'
          color='warning'
          label={daysLeft >= 365 ? status : `${daysLeft} days left`}
          sx={{ userSelect: 'none' }}
        />
      </>
    )
  } else {
    return (
      <>
        <Chip
          icon={icon}
          size='small'
          color='success'
          label={daysLeft >= 365 ? status : `${daysLeft} days left`}
          sx={{ userSelect: 'none' }}
        />
      </>
    )
  }
}
