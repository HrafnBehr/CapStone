import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserProfileMenu } from './components/UserProfileMenu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import LogoutIcon from '@mui/icons-material/Logout'
import { logout } from './api/users'
import { useToast } from './hooks/useToast'
import { useAuth } from './hooks/useAuth'

const navItems = [
  { label: 'Dashboard', path: '/', icon: DashboardIcon },
  { label: 'Tasks', path: '/tasks', icon: PlaylistAddCheckIcon },
]

const drawerWidth = 240

export default function Layout() {
  const isMd = (theme) => theme.breakpoints.up('md')
  const navigate = useNavigate()
  const toast = useToast()
  const { setIsAuthenticated, setUser } = useAuth()

  const handleNavItemClick = (path) => {
    navigate(path)
  }

  const handleLogout = async () => {
    try {
      const ok = await logout()
      if (ok) {
        navigate('/login')
        setIsAuthenticated(false)
        setUser({});
      } else {
        throw new Error('Failed to logout')
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const nav = (
    <Stack height='100%'>
      <Toolbar variant='dense'>
        <Typography variant='h6' noWrap>
          PROMPT
        </Typography>
      </Toolbar>
      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => handleNavItemClick(item.path)}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <AppBar
        osition='fixed'
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: 'white',
          color: 'black',
        }}
        elevation={0}
      >
        <Toolbar variant='dense'>
          <Box sx={{ flexGrow: 1 }} />
          <UserProfileMenu />
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMd ? 'permanent' : 'temporary'}
        anchor='left'
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {nav}
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
