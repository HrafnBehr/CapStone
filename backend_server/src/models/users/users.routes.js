const express = require('express')
const jwt = require('jsonwebtoken')
const { getUserById, getAllUsers } = require('./users.service')

const router = express.Router()

router.get('/', async (req, res) => {
  const filters = req.query;

  try {
    const users = await getAllUsers(filters)
    return res.status(200).json({ users })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.get('/getProjectManagers', async (_req, res) => {

  try {
    const users = await getAllUsers()
    return res.status(200).json({ users: users.filter((u) => u.is_pm )})
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.get('/getUserInfo', async (req, res) => {
  const token = req.cookies.jwt
  if (!token) {
    return res.clearCookie('jwt').status(401).send()
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserById(parseInt(decodedToken.sub))
    return res.status(200).json({ user })
  } catch (err) {
    return res.clearCookie('jwt').status(500).json({ error: err.message })
  }
})

module.exports = router