const db = require('../../../db')

async function getAllstakes(project_id) {
  const stakes = await db('stakeholders').where({ project_id })
  return stakes
}

async function getStakesbyid(id) {
  const stakes = await db('stakeholders').where({ id }).first()
  return stakes
}

async function CreateStake(stakes) {
  const [newStakes] = await db('stakeholders').insert(stakes).returning('*')
  return newStakes
}

async function deleteStake(id) {
  const deletedstakes = await db('stakeholders')
    .where({ id })
    .del()
    .returning('*')
  return deletedstakes
}

async function updatedStakes(id, stakes) {
  const Staketoupdate = await db('stakeholders').where({ id }).first()

  const [updatedstakes] = await db('stakeholders')
    .where({ id })
    .update({
      ...Staketoupdate,
      ...stakes,
    })
    .returning('*')

  return updatedstakes
}

module.exports = {
  getAllstakes,
  getStakesbyid,
  CreateStake,
  deleteStake,
  updatedStakes,
}
