import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useContext, createContext } from "react";
import Login from '../src/LoginPage.js'
import Home from '../src/Home.js'
import CreateAccount from '../src/CreateAccount.js'
import CreateProgram from '../src/CreateProgram.js'
import SingleProgram from '../src/SingleProgram.js'
import TesterView from './TesterView.jsx'
import UserContext from "./AuthMaker";

function App() {

  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/CreateAccount' element={<CreateAccount />} />
          <Route path='/CreateProgram' element={<CreateProgram />} />
          <Route path='/Program/:id' element={<SingleProgram />} />
          <Route path='/TesterView' element={<TesterView />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
