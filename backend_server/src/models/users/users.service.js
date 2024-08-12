const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../db')

async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 12)
  const userId = db('users').insert({ username, password: hashedPassword }, [
    'id',
  ])
  return userId
}

async function loginUser({ username, password }) {
  const user = await db('users').where({ username }).first()
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('invalid username or password')
  }

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })

  return token
}

module.exports = { createUser, loginUser }