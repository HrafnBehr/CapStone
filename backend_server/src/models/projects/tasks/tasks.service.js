const db = require('../../../db');

async function getAllTasks(project_id) {
  const tasks = await db('tasks').where({ project_id });
  return tasks;
}

async function getTaskById(id) {
  const task = await db('tasks').where({ id }).first();
  return task;
}

async function createTask({ title, completed, start_date, due_date, project_id }) {
  const [newTask] = await db('tasks').insert({
    title,
    completed,
    start_date: new Date(start_date),
    due_date: new Date(due_date),
    project_id
  }).returning('*');
  return newTask;
}

async function deleteTask(id) {
  const deletedTask = await db('tasks').where({ id }).del().returning('*');
  return deletedTask;
}

async function updateTask(id, { title, completed, start_date, due_date }) {
  const taskToUpdate = await db('tasks').where({ id }).first();

  const [updatedTask] = await db('tasks').where({ id }).update({
    ...taskToUpdate,
    ...{
      title,
      completed,
      start_date: new Date(start_date),
      due_date: new Date(due_date)
    }
  }).returning('*');

  return updatedTask;
}


module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask
}