const db = require('../../db')

async function getAllActivities(filters) {
  return await db('pathway_activities').select('*').where(filters)
}

async function getActivityById(id) {
  return await db('pathway_activities').select('*').where({ id }).first()
}

module.exports = { getAllActivities, getActivityById }
