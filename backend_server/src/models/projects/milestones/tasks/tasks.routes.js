const express = require('express');
const { getAllTasks, getTaskById, createTask, deleteTask, updateTask } = require('./tasks.service');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { milestoneId } = req.params;

  try {
    const tasks = await getAllTasks(milestoneId);
    res.status(200).json({ tasks })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { milestoneId } = req.params;
  const { id } = req.params;

  try {
    const task = await getTaskById(milestoneId, id);
    res.status(200).json({ task })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

router.post('/', async (req, res) => {
  const { task } = req.body;

  try {
    const newTask = await createTask(task);
    res.status(200).json({ task: newTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await deleteTask(id);
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const updatedTask = await updateTask(id, task);
    res.status(200).json({ task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router;