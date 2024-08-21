import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const SearchContext = createContext({
  search: '',
  setSearch: () => {},
})

export default function SearchProvider({ children }) {
  const [search, setSearch] = useState('')

  const pathname = useLocation().pathname

  useEffect(() => setSearch(''), [pathname])

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}
