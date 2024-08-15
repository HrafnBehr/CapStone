import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../src/LoginPage.js'
import Home from '../src/Home.js'
import CreateAccount from '../src/CreateAccount.js'
import CreateProgram from '../src/CreateProgram.js'
import SingleProgram from '../src/SingleProgram.js'
import TimelineView from './TimelineView.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/CreateAccount' element={<CreateAccount />} />
        <Route path='/CreateProgram' element={<CreateProgram />} />
        <Route path='/Program/:id' element={<SingleProgram />} />
        <Route path='/project/:id/timeline' element={<TimelineView />} />
      </Routes>
    </Router>
  )
}

export default App
