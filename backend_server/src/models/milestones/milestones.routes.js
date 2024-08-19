const express = require('express')
const { getAllMilestones, getMilestoneById } = require('./milestones.service')

const router = express.Router()

router.get('/', async (req, res) => {
  const filters = req.query

  try {
    const milestones = await getAllMilestones(filters)
    res.json({ milestones })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const milestone = await getMilestoneById(id)
    res.json({ milestone })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
