const db = require('../../db')

async function getAllUsers(filters) {
  if (filters.length === 0) {
    return await db('users')
  } else {
    return await db('users').where(filters)
  }
}

async function getUserById(id) {
  const user = await db('users').where({ id }).first()

  return user
}

async function getUserByUsername(username) {
  const user = await db('users').where({ username }).first()

  return user
}

async function updateUser(id, user) {
  return await db('users').where({ id }).update(user)
}

module.exports = { getUserById, getUserByUsername, getAllUsers, updateUser }
