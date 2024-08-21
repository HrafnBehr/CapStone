import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SnackbarProvider } from 'notistack'
import { AuthContextProvider } from '../AuthMaker'
import SearchProvider from '../contexts/SearchContext'
import { BrowserRouter } from 'react-router-dom'

export function Providers({ children }) {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} disableWindowBlurListener preventDuplicate>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthContextProvider>
            <SearchProvider>{children}</SearchProvider>
          </AuthContextProvider>
        </LocalizationProvider>
      </SnackbarProvider>
    </BrowserRouter>
  )
}
