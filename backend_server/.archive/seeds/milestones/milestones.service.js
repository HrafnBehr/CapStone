const db = require('../../../src/db')

async function getAllMilestones(pathway_id) {
  return await db('pathway_milestones').select('*').where({ pathway_id })
}

async function getMilestoneById(id) {
  return await db('pathway_milestones').select('*').where({ id }).first()
}

module.exports = { getAllMilestones, getMilestoneById }