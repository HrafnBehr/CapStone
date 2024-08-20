export const getProjects = async () => {
  const res = await fetch('http://localhost:8080/api/v1/projects', {
    credentials: 'include',
  })
  const data = await res.json()
  return data.projects
}

export const getProjectById = async (id) => {
  const res = await fetch(`http://localhost:8080/api/v1/projects/${id}`, {
    credentials: 'include',
  })
  const data = await res.json()
  return data.project
}

export const updateProject = async (id, project) => {
  const res = await fetch(`http://localhost:8080/api/v1/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
    credentials: 'include',
  })

  if (res.ok) {
    const data = await res.json()
    return data.project
  }

  throw new Error('Could not update project')
}
