const express = require('express')
const jwt = require('jsonwebtoken')
const { getUserById } = require('./users.service')

const router = express.Router()

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