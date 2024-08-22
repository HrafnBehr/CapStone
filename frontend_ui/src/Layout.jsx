import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserProfileMenu } from './components/UserProfileMenu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import LogoutIcon from '@mui/icons-material/Logout'
import { logout } from './api/users'
import { useToast } from './hooks/useToast'
import { useAuth } from './hooks/useAuth'
import { DarkModeToggle } from './components/DarkModeToggle'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@emotion/react'
import { useState } from 'react'
import { AppBarSearchBox } from './components/AppBarSearchBox'
import GroupIcon from '@mui/icons-material/Group'
import RouteIcon from '@mui/icons-material/Route'

const navItems = [
  { label: 'Dashboard', path: '/', icon: DashboardIcon },
  { label: 'Tasks', path: '/tasks', icon: PlaylistAddCheckIcon },
]

const adminItems = [
  { label: 'Users', path: '/admin/users', icon: GroupIcon },
  { label: 'Pathways', path: '/admin/pathways', icon: RouteIcon },
]

const drawerWidth = 240

export default function Layout() {
  const [open, setOpen] = useState(false)

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
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
        setUser({})
      } else {
        throw new Error('Failed to logout')
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const nav = (
    <Stack height='100%'>
      <Toolbar
        sx={{
          bgcolor:
            'var(--mui-palette-AppBar-darkBg, var(--mui-palette-primary-main))',
          color:
            'var(--mui-palette-AppBar-darkColor, var(--mui-palette-primary-contrastText))',
        }}
      >
        <Typography variant='h6' noWrap>
          PROMPT
        </Typography>
      </Toolbar>
      <Divider />

      <List>
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
      <List
        subheader={<ListSubheader>Admin</ListSubheader>}
        sx={{ flexGrow: 1 }}
      >
        {adminItems.map((item) => (
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
        position='fixed'
        sx={{
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
        elevation={0}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            {!isDesktop && (
              <IconButton color='inherit' onClick={() => setOpen(!open)}>
                <MenuIcon />
              </IconButton>
            )}

            <AppBarSearchBox />
          </Box>
          <DarkModeToggle />
          <UserProfileMenu />
        </Toolbar>
      </AppBar>

      {isDesktop ? (
        <Drawer
          variant='permanent'
          anchor='left'
          sx={{
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
      ) : (
        <Drawer
          variant='temporary'
          anchor='left'
          open={open}
          onClose={() => setOpen(false)}
          sx={{
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
      )}

      <Box component='main' sx={{ flexGrow: 1, my: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
