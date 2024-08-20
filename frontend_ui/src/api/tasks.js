export async function getAllTasks() {
  const res = await fetch('http://localhost:8080/api/v1/tasks', {
    credentials: 'include',
  })
  const data = await res.json()
  return data.tasks
}

export async function getTasksByProjectId(project_id) {
  const res = await fetch(
    `http://localhost:8080/api/v1/tasks?project_id=${project_id}`,
    {
      credentials: 'include',
    },
  )
  const data = await res.json()
  return data.tasks
}
