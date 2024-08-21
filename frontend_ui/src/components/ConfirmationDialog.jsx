import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'

export function ConfirmationDialog(props) {
  const { onConfirm, title, content } = props

  const [open, setOpen] = useState(false)

  const showDialog = () => {
    setOpen(true)
  }

  const hideDialog = () => {
    setOpen(false)
  }

  const confirmAction = () => {
    onConfirm()
    hideDialog()
  }

  return (
    <>
      {props.children(showDialog)}
      <Dialog
        open={open}
        onClose={hideDialog}
        aria-labelledby='confirm-dialog-title'
        aria-describedby='confirm-dialog-text'
      >
        <DialogTitle id='confirm-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='confirm-dialog-text'>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={hideDialog}>Cancel</Button>
          <Button
            onClick={confirmAction}
            autoFocus
            color='error'
            variant='outlined'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
