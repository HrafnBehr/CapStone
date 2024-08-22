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

export const deleteTask = async (taskId) => {
  const response = await fetch(`http://localhost:8080/api/v1/tasks/${taskId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to delete task')
  }

  return response.json()
}
