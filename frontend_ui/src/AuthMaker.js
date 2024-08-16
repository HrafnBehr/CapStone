import { createContext, useContext, useState } from 'react'

// const AuthContext = createContext()

// export function Authority() {

  const UserContext = createContext();

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

export default UserContext
