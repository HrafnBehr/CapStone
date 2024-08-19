import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../src/LoginPage.js'
import Home from '../src/Home.js'
import CreateAccount from '../src/CreateAccount.js'
import CreateProgram from '../src/CreateProgram.js'
import SingleProgram from '../src/SingleProgram.js'
import TasksView from './TasksView.jsx'
import { AuthContextProvider } from './AuthMaker'
import { AuthGuard } from './components/AuthGuard'
import { SnackbarProvider } from 'notistack'
import Layout from './Layout.jsx'

function App() {
  return (
    <SnackbarProvider maxSnack={3} disableWindowBlurListener preventDuplicate>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route element={<AuthGuard redirectTo='/login' />}>
              <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='CreateProgram' element={<CreateProgram />} />
                <Route path='Program/:id' element={<SingleProgram />} />
                <Route
                  path='Program/:id/activities'
                  element={<singleprogramactivities />}
                />
                <Route
                  path='Program/:id/activities/tasks'
                  element={<singleprogramtasks />}
                />
                <Route path='tasks' element={<TasksView />} />
              </Route>
            </Route>

            <Route path='login' element={<Login />} />
            <Route path='register' element={<CreateAccount />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </SnackbarProvider>
  )
}

export default App
