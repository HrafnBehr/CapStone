const express = require('express')
const {
  getAllRisks,
  getRiskById,
  createRisk,
  deleteRisk,
  updateRisk,
} = require('./risks.service')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  const { projectId } = req.params
  console.log(req.params)

  try {
    const risks = await getAllRisks(projectId)
    res.status(200).json({ risks })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const risk = await getRiskById(id)
    res.status(200).json({ risk })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { risk } = req.body

  try {
    const newRisk = await createRisk(risk)
    res.status(200).json({ risk: newRisk })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const risk = await deleteRisk(id)
    res.status(200).json({ risk })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { risk } = req.body

  try {
    const updatedRisk = await updateRisk(id, risk)
    res.status(200).json({ risk: updatedRisk })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
