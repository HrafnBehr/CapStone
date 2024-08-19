const express = require('express')
const { getAllActivities, getActivityById } = require('./activities.service')

const router = express.Router()

router.get('/', async (req, res) => {
  const filters = req.query

  try {
    const activities = await getAllActivities(filters)
    res.json({ activities })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const activity = await getActivityById(id)
    res.json({ activity })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
