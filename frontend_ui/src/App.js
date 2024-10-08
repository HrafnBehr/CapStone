import { Routes, Route } from 'react-router-dom'
import Login from '../src/LoginPage'
import Home from '../src/Home'
import CreateAccount from './CreateAccount'
import SingleProgram from './SingleProgram'
import TasksView from './TasksView'
import { AuthGuard } from './components/AuthGuard'
import Layout from './Layout'
import ProfilePage from './ProfilePage'
import { Providers } from './components/Providers'
import UsersPage from './UsersPage'
import AuthLayout from './AuthLayout'
import PathwaysPage from './PathwaysPage'
import MilestonesPage from './MilestonesPage'
import ActivityListPage from './ActivityListPage'

function App() {
  return (
    <Providers>
      <Routes>
        <Route element={<AuthGuard redirectTo='/login' />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='Program/:id' element={<SingleProgram />} />
            <Route path='tasks' element={<TasksView />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='admin/users' element={<UsersPage />} />
            <Route path='/admin/pathways'>
              <Route index element={<PathwaysPage />} />
              <Route path=':pathwayId' element={<MilestonesPage />} />
              <Route
                path=':pathwayId/milestones/:milestoneId'
                element={<ActivityListPage />}
              />
            </Route>
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<CreateAccount />} />
        </Route>
      </Routes>
    </Providers>
  )
}

export default App
