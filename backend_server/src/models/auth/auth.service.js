const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../db')

async function register({ first_name, last_name, username, password, is_pm }) {
  const hashedPassword = await bcrypt.hash(password, 12)
  const [user] = await db('users').insert(
    { username, first_name, last_name, is_pm: is_pm || false },
    ['id'],
  )
  await db('passwords').insert({ user_id: user.id, password: hashedPassword })

  return {
    id: user.id,
    first_name,
    last_name,
  }
}

async function login({ username, password }) {
  const user = await db('users').where({ username }).first()

  if (!user) {
    throw new Error('invalid username or password')
  }

  const userPassword = await db('passwords').where({ user_id: user.id }).first()

  const isPasswordValid = await bcrypt.compare(password, userPassword.password)
  if (!isPasswordValid) {
    throw new Error('invalid username or password')
  }

  const token = jwt.sign({ sub: user.id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })

  return token
}

module.exports = { register, login }
