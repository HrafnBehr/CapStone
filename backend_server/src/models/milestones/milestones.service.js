const db = require('../../db')

async function getAllMilestones(filters) {
  return await db('pathway_milestones').select('*').where(filters)
}

async function getMilestoneById(id) {
  return await db('pathway_milestones').select('*').where({ id }).first()
}

module.exports = { getAllMilestones, getMilestoneById }