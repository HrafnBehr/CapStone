import { Divider, IconButton, Menu, MenuItem } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useState } from 'react'
import { useToast } from '../hooks/useToast'
import { useNavigate } from 'react-router-dom'

export function UserProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null)

  const toast = useToast()
  const navigate = useNavigate()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await fetch(`http://localhost:8080/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <IconButton
        aria-label='account of current user'
        aria-controls='user-profile-menu'
        aria-haspopup='true'
        color='inherit'
        onClick={handleMenu}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id='user-profile-menu'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
