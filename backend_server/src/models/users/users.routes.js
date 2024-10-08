const express = require('express')
const jwt = require('jsonwebtoken')
const { getUserById, getAllUsers, updateUser } = require('./users.service')

const router = express.Router()

router.get('/', async (req, res) => {
  const filters = req.query

  try {
    const users = await getAllUsers(filters)
    return res.status(200).json({ users })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.get('/getProjectManagers', async (_req, res) => {
  try {
    const users = await getAllUsers({ is_pm: true })
    return res.status(200).json({ users })
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
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await getUserById(parseInt(decodedToken.sub))
    return res.status(200).json({ user })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await updateUser(id, req.body)
    return res.status(204).send()
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: err.message })
  }
})

module.exports = router
