const express = require('express')
const { register, login } = require('./auth.service')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body)
    return res.status(200).json({ user })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const token = await login(req.body)
    return res
      .cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 14, // 2 weeks
      })
      .status(200)
      .send()
  } catch (err) {
    return res.clearCookie('jwt').status(401).json({ error: err.message })
  }
})

router.post('/logout', async (_req, res) => {
  return res.clearCookie('jwt').status(200).send()
})

router.get('/verify', async (req, res) => {
  const token = req.cookies.jwt
  if (!token) {
    return res.clearCookie('jwt').status(401).send()
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.clearCookie('jwt').status(401).send()
    }
  
    return res.status(200).send()
  })
})

module.exports = router