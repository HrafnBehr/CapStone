import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../src/LoginPage'
import Home from '../src/Home'
import CreateAccount from './CreateAccount'
import CreateProgram from './CreateProgram'
import SingleProgram from './SingleProgram'
import TasksView from './TasksView'
import { AuthContextProvider } from './AuthMaker'
import { AuthGuard } from './components/AuthGuard'
import { SnackbarProvider } from 'notistack'
import Layout from './Layout'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ProfilePage from './ProfilePage'

function App() {
  return (
    <SnackbarProvider maxSnack={3} disableWindowBlurListener preventDuplicate>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthContextProvider>
          <Router>
            <Routes>
              <Route element={<AuthGuard redirectTo='/login' />}>
                <Route element={<Layout />}>
                  <Route path='/' element={<Home />} />
                  <Route path='Program/:id' element={<SingleProgram />} />
                  <Route path='tasks' element={<TasksView />} />
                  <Route path='profile' element={<ProfilePage />} />
                </Route>
              </Route>

              <Route path='login' element={<Login />} />
              <Route path='register' element={<CreateAccount />} />
            </Routes>
          </Router>
        </AuthContextProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  )
}

export default App
