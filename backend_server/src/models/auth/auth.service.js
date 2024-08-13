const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../db')

async function register({ first_name, last_name, is_pm = false, username, password }) {
  const hashedPassword = await bcrypt.hash(password, 12)
  const [data] = await db('users').insert({ username, password: hashedPassword, first_name, last_name, is_pm }, ['id'])

  return {
    id: data.id,
    first_name,
    last_name,
    is_pm
  }
}

async function login({ username, password }) {
  const user = await db('users').where({ username }).first()
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('invalid username or password')
  }

  console.log(process.env.JWT_SECRET)

  const token = jwt.sign({ sub: user.id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })

  return token
}

module.exports = { register, login }