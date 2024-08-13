const express = require('express');
const { listAllProjects, getProjectbyid, addNewProject, Editprojs, deleteproject}= require('./projects.service')
const risksRouter = require('./risks/risks.routes')
const milestonesRouter = require('./milestones/milestones.routes')

const router = express.Router();

// Nested routes
router.use('/:projectId/risks', risksRouter)
router.use('/:projectId/milestones', milestonesRouter)
// router.use('/:id/tasks', tasksRouter)
// router.use('/:id/stakeholders', stakeholdersRouter)

router.get('/', async (_req, res) => {
  const projects = await listAllProjects();
  return res.status(200).json({projects})
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const project = await getProjectbyid(id);
    return res.status(200).json({project})
})

router.post('/', async (req, res) => {
    const project = await addNewProject(req.body)

    return res.status(200).json({project})
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const project = await Editprojs(id, req.body)
  return res.status(200).json({project})
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const project = await deleteproject(id)

  return res.status(200).json({project})
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params

  const project = await Editprojs(id, req.body)

  return res.status(200).json({project})
})


module.exports = router