const express = require('express')
const router = express.Router()

router.get('/login', (_req, res) => {
  res.status(200).json({ hello: 'world'})
})