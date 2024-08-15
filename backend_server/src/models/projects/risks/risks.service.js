const db = require('../../../db')

async function getAllRisks(project_id) {
  const risks = await db('risks').where({ project_id })
  return risks
}

async function getRiskById(id) {
  const risk = await db('risks').where({ id }).first()
  return risk
}

async function createRisk(risk) {
  const [newRisk] = await db('risks').insert(risk).returning('*')
  return newRisk
}

async function deleteRisk(id) {
  const deletedRisk = await db('risks').where({ id }).del().returning('*')
  return deletedRisk
}

async function updateRisk(id, risk) {
  const riskToUpdate = await db('risks').where({ id }).first()

  const [updatedRisk] = await db('risks')
    .where({ id })
    .update({
      ...riskToUpdate,
      ...risk,
    })
    .returning('*')

  return updatedRisk
}

module.exports = {
  getAllRisks,
  getRiskById,
  createRisk,
  deleteRisk,
  updateRisk,
}
