const db = require('../../db')

async function getAllTasks(filters) {
  const tasks = await db
    .select(
      'project_tasks.*',
      db.raw(
        `json_build_object('id', projects.id, 'name', projects.name) as project`,
      ),
      db.raw(
        `json_build_object('id', pathways.id, 'name', pathways.name) as pathway`,
      ),
      db.raw(`json_build_object('id', pm.id, 'name', pm.name) as milestone`),
      db.raw(`json_build_object('id', pa.id, 'name', pa.name) as activity`),
    )
    .from('project_tasks')
    .leftJoin('projects', 'project_tasks.project_id', 'projects.id')
    .leftJoin('pathways', 'project_tasks.pathway_id', 'pathways.id')
    .leftJoin('pathway_milestones as pm', 'project_tasks.milestone_id', 'pm.id')
    .leftJoin('pathway_activities as pa', 'project_tasks.activity_id', 'pa.id')
    .where((builder) => {
      const { start_date, end_date, ...rest } = filters

      Object.entries(rest).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          builder.whereIn(`project_tasks.${key}`, value)
        } else {
          builder.where(`project_tasks.${key}`, value)
        }
      })

      if (start_date && end_date) {
        builder.where(function () {
          this.whereBetween('project_tasks.start_date', [start_date, end_date])
          this.orWhereBetween('project_tasks.end_date', [start_date, end_date])
        })
      } else if (start_date) {
        builder.where(function () {
          this.where('project_tasks.start_date', '>=', start_date)
          this.orWhere('project_tasks.end_date', '>=', start_date)
        })
      } else if (end_date) {
        builder.where(function () {
          this.where('project_tasks.start_date', '<=', end_date)
          this.orWhere('project_tasks.end_date', '<=', end_date)
        })
      }
    })

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
  project_id,
  pathway_id,
  milestone_id,
  activity_id,
}) {
  const [newTask] = await db('project_tasks')
    .insert({
      title,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      project_id,
      pathway_id,
      milestone_id,
      activity_id,
    })
    .returning('*')
  return newTask
}

async function deleteTask(id) {
  const deletedTask = await db('project_tasks')
    .where({ id })
    .del()
    .returning('*')
  return deletedTask
}

async function updateTask(id, { title, start_date, end_date }) {
  const taskToUpdate = await db('project_tasks').where({ id }).first()

  const [updatedTask] = await db('project_tasks')
    .where('id', taskToUpdate.id)
    .update({
      ...taskToUpdate,
      title: title || taskToUpdate.title,
      start_date: new Date(start_date) || taskToUpdate.start_date,
      end_date: new Date(end_date) || taskToUpdate.end_date,
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
