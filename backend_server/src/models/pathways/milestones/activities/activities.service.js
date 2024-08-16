const db = require('../../../../db')

async function getAllActivities(milestone_id) {
  return await db('pathway_activities').select('*').where({ milestone_id })
}

async function getActivityById(id) {
  return await db('pathway_activities').select('*').where({ id }).first()
}

module.exports = { getAllActivities, getActivityById }