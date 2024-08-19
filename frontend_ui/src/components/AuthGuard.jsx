import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthGuard({ redirectTo = '/' }) {
  const [canActivate, setCanActivate] = useState()

  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (loading) return

    setCanActivate(isAuthenticated ? true : redirectTo)
  }, [isAuthenticated, loading, redirectTo])

  if (canActivate === undefined) return null

  return typeof canActivate === 'string' ? (
    <Navigate to={canActivate} />
  ) : (
    <Outlet />
  )
}

AuthGuard.propTypes = {
  redirectTo: PropTypes.string,
}
