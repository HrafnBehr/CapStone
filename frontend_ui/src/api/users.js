export const checkAuth = async () => {
  const res = await fetch('http://localhost:8080/api/v1/auth/verify', {
    method: 'GET',
    credentials: 'include',
  })

  return res.ok
}

export const login = async ({ username, password }) => {
  const res = await fetch('http://localhost:8080/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  })

  return res.ok
}

export const signup = async ({ username, password }) => {
  const res = await fetch('http://localhost:8080/api/v1/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  })

  return res.ok
}