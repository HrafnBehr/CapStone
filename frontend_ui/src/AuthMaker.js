// import { createContext, useContext, useState } from 'react' **

// const AuthContext = createContext()

// export function Authority() {

// const UserContext = createContext(); **

// return (
// <AuthContext.Provider value={{auth, login, logout}}>
//   {children}
// </AuthContext.Provider>
// <h1>?</h1>
//   )
// }

// export function useAuth() {
//   return useContext(AuthContext)
// }

// export default UserContext **

// Auth example from Jason so probably way better:

import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { checkAuth } from './api/users'

export const AuthContext = createContext({
  isAuthenticated: false,
  loading: true,
  setIsAuthenticated: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    checkAuth().then(async (ok) => {
      if (ok) {
        const res = await fetch(
          `http://localhost:8080/api/v1/users/getUserInfo`,
          {
            credentials: 'include',
          },
        )

        const data = await res.json()
        setUser(data.user)
      }
      setIsAuthenticated(ok)
      setLoading(false)
    })
  }, [])

  if (loading) return null

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
