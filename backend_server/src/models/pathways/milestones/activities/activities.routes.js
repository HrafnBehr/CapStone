const express = require('express');
const { getAllActivities, getActivityById } = require('./activities.service');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const milestone_id = req.params.milestone_id;

  try {
    const activities = await getAllActivities(milestone_id);
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const activity = await getActivityById(id);
    res.json({ activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;