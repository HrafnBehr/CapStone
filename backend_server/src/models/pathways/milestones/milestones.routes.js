const express = require('express');
const { getAllMilestones, getMilestoneById } = require('./milestones.service');
const activitiesRouter = require('./activities/activities.routes');

const router = express.Router({ mergeParams: true });
router.use('/:milestone_id/activities', activitiesRouter);

router.get('/', async (req, res) => {
  const pathway_id = req.params.pathway_id;

  try {
    const milestones = await getAllMilestones(pathway_id);
    res.json({ milestones });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const milestone = await getMilestoneById(id);
    res.json({ milestone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;