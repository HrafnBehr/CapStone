import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { MilestonePicker } from './MilestonePicker'
import { ActivityPicker } from './ActivityPicker'
import { useToast } from '../hooks/useToast'

export function CreateTaskModal({ project_id, pathway_id, onSuccess }) {
  const [open, setOpen] = useState(false)
  const toast = useToast()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Create New Task
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='sm'
        fullWidth
        keepMounted
        aria-labelledby='create-task-dialog-title'
        PaperProps={{
          component: 'form',
          onSubmit: async (e) => {
            e.preventDefault()

            const formData = new FormData(e.target)
            const taskInfo = Object.fromEntries(formData)
            taskInfo.project_id = project_id
            taskInfo.pathway_id = pathway_id

            try {
              const response = await fetch(
                'http://localhost:8080/api/v1/tasks',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(taskInfo),
                  credentials: 'include',
                },
              )

              if (!response.ok) {
                throw new Error('Could not create task')
              }

              const data = await response.json()
              onSuccess(data.task)

              toast.success('Task created successfully')
              handleClose()
            } catch (error) {
              toast.error(error.message)
            }
          },
        }}
      >
        <DialogTitle id='create-task-dialog-title'>Create New Task</DialogTitle>
        <DialogContent>
          <Stack spacing={2} py={1}>
            <TextField label='Task Title' name='title' fullWidth />

            <Grid container>
              <Grid item xs={6}>
                <DatePicker
                  label='Start Date'
                  name='start_date'
                  slotProps={{ textField: { fullWidth: true } }}
                  sx={{ pr: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label='End Date'
                  name='end_date'
                  slotProps={{ textField: { fullWidth: true } }}
                  sx={{ pl: 1 }}
                />
              </Grid>
            </Grid>

            <MilestonePicker />
            <ActivityPicker />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained'>
            Create Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
