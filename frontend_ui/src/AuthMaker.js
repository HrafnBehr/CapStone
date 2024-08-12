import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext= createContext();

export function Authority(){

  return (
    <AuthContext.Provider value={{auth, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext);
}