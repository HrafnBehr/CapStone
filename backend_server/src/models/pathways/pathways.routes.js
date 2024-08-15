const express = require('express');
const { getAllPathways, getPathwayById } = require('./pathways.service');
const milestonesRouter = require('./milestones/milestones.routes')

const router = express.Router();
router.use('/:pathway_id/milestones', milestonesRouter)

router.get('/', async (req, res) => {
  const filters = req.query;

  try {
    const pathways = await getAllPathways(filters);
    res.json({ pathways });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const pathway = await getPathwayById(id);
    res.json({ pathway });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;