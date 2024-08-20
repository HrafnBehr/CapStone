const express = require('express')
const {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
} = require('./tasks.service')

const router = express.Router()

router.get('/', async (req, res) => {
  const filters = req.query

  try {
    const tasks = await getAllTasks(filters)
    res.status(200).json({ tasks })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await getTaskById(id)
    res.status(200).json({ task })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const newTask = await createTask(req.body)
    res.status(200).json({ task: newTask })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await deleteTask(id)
    res.status(200).json({ task })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const updatedTask = await updateTask(id, req.body)
    res.status(200).json({ task: updatedTask })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
