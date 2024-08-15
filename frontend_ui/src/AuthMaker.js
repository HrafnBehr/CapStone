import { createContext, useContext } from 'react'

const AuthContext = createContext()

export function Authority() {
  return (
    // <AuthContext.Provider value={{auth, login, logout}}>
    //   {children}
    // </AuthContext.Provider>
    <h1>?</h1>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
