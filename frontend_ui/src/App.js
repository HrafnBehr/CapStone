import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useContext, createContext } from "react";
import Login from '../src/LoginPage.js'
import Home from '../src/Home.js'
import CreateAccount from '../src/CreateAccount.js'
import CreateProgram from '../src/CreateProgram.js'
import SingleProgram from '../src/SingleProgram.js'
import TesterView from './TesterView.jsx'
import FilterView from './FilterView.jsx'
// import UserContext from "./AuthMaker";
import { AuthContextProvider } from "./AuthMaker"
import { AuthGuard } from "./components/AuthGuard"

function App() {
  const [loggedin, setloggedin] = useState(false)
  const [user, setUser] = useState(null)

  // const login = (userData) => {
  //   setUser(userData);
  // };

  // const logout = () => {
  //   setUser(null);
  // };

  return (
    // <UserContext.Provider value={{ user, login, logout }}>
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route element={<AuthGuard redirectTo="/login" />}>
            <Route path='/' element={<Home />} />
            <Route path='CreateAccount' element={<CreateAccount />} />
            <Route path='CreateProgram' element={<CreateProgram />} />
            <Route path='Program/:id' element={<SingleProgram />} />
            <Route path='TesterView' element={<TesterView />} />
            <Route path='filter' element={<FilterView />} />
          </Route>

            <Route path='login' element={<Login />} />
        </Routes>
      </Router>
    </AuthContextProvider>
    // </UserContext.Provider>
  )
}

export default App
