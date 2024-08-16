const db = require('../../../db')

async function getAllTasks(project_id) {
  const tasks = await db('project_tasks').where({ project_id })
  return tasks
}

async function getTaskById(id) {
  const task = await db('project_tasks').where({ id }).first()
  return task
}

async function createTask({
  title,
  start_date,
  end_date, 
  activity_id,
  project_id,
}) {
  const [newTask] = await db('project_tasks')
    .insert({
      title,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      activity_id,
      project_id,
    })
    .returning('*')
  return newTask
}

async function deleteTask(id) {
  const deletedTask = await db('project_tasks').where({ id }).del().returning('*')
  return deletedTask
}

async function updateTask(id, { title, start_date, end_date }) {
  const taskToUpdate = await db('project_tasks').where({ id }).first()

  const [updatedTask] = await db('project_tasks')
    .where({ id })
    .update({
      ...taskToUpdate,
      ...{
        title,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
    })
    .returning('*')

  return updatedTask
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
}
