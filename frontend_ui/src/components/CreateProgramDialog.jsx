import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Stack,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { PathwayPicker } from './PathwayPicker'
import { UserPicker } from './UserPicker'
import { useToast } from '../hooks/useToast'

export function CreateProgramDialog({ onSuccess }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const showDialog = () => {
    setOpen(true)
  }

  const hideDialog = () => {
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const programDetails = {
      name: formData.get('name'),
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date'),
      description: formData.get('description'),
      pathway_id: formData.get('pathway_id'),
      project_manager_id: formData.get('user_id'),
    }

    try {
      setLoading(true)
      const response = await fetch('http://localhost:8080/api/v1/projects', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programDetails),
      })

      if (!response.ok) {
        throw new Error('Failed to fulfill your request')
      }

      const data = await response.json()

      toast.success('New program added to listing')
      onSuccess(data.project)
      hideDialog()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box sx={{ position: 'absolute', bottom: 40, right: 40, zIndex: 1 }}>
        <Fab color='secondary' aria-label='add' onClick={showDialog}>
          <AddIcon />
        </Fab>
      </Box>

      <Dialog
        open={open}
        maxWidth='sm'
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle id='create-program-dialog-title'>
          Create a New Program
        </DialogTitle>

        <DialogContent>
          <Stack gap={3}>
            <TextField id='name' name='name' label='Project Name' />

            <TextField
              id='description'
              name='description'
              label='Project Description'
              multiline
              rows={5}
            />

            <DatePicker
              label='Start Date'
              id='start_date'
              name='start_date'
              defaultValue={dayjs()}
            />

            <DatePicker
              label='End Date'
              id='end_date'
              name='end_date'
              defaultValue={dayjs()}
            />

            <PathwayPicker />

            <UserPicker label='Project Manager' is_pm={true} />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={hideDialog} disabled={loading}>
            Cancel
          </Button>
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
