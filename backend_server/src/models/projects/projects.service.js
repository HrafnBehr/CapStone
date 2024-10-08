const db = require('../../db')

async function listAllProjects(filters) {
  if (filters.length === 0) {
    return await db
      .select(
        'projects.*',
        db.raw(
          "json_build_object('id', users.id, 'first_name', users.first_name, 'last_name', users.last_name) as project_manager",
        ),
      )
      .from('projects')
      .leftJoin('users', 'projects.project_manager_id', 'users.id')
      .orderBy('name')
  } else {
    return await db
      .select(
        'projects.*',
        db.raw(
          "json_build_object('id', users.id, 'first_name', users.first_name, 'last_name', users.last_name) as project_manager",
        ),
      )
      .where(filters)
      .from('projects')
      .leftJoin('users', 'projects.project_manager_id', 'users.id')
      .orderBy('name')
  }
}

async function getProjectbyid(id) {
  return await db
    .select(
      'projects.*',
      db.raw(
        "json_build_object('id', users.id, 'first_name', users.first_name, 'last_name', users.last_name) as project_manager",
      ),
    )
    .from('projects')
    .leftJoin('users', 'projects.project_manager_id', 'users.id')
    .where({ 'projects.id': id })
    .first()
}

async function addNewProject({
  name,
  start_date,
  end_date,
  description,
  project_manager_id,
  pathway_id,
}) {
  const [project] = await db
    .insert({
      name,
      description,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      project_manager_id,
      pathway_id,
    })
    .into('projects')
    .returning('*')
  return project
}

async function Editprojs(
  id,
  { name, description, start_date, end_date, project_manager_id },
) {
  const project = await db('projects').select('*').where({ id }).first()

  const [updatedproj] = await db('projects')
    .where({ id })
    .update({
      name: name || project.name,
      description: description || project.description,
      start_date: start_date ? new Date(start_date) : project.start_date,
      end_date: end_date ? new Date(end_date) : project.end_date,
      project_manager_id: project_manager_id || project.project_manager_id,
    })
    .returning('*')

  return updatedproj
}

async function deleteproject(id) {
  const [delprojs] = await db('projects').where({ id }).delete().returning('*')

  return delprojs
}

module.exports = {
  listAllProjects,
  getProjectbyid,
  addNewProject,
  Editprojs,
  deleteproject,
}
