const express = require('express')
const {
  listAllProjects,
  getProjectbyid,
  addNewProject,
  Editprojs,
  deleteproject,
} = require('./projects.service')
const risksRouter = require('./risks/risks.routes')

const router = express.Router()

// Nested routes
router.use('/:projectId/risks', risksRouter)

router.get('/', async (_req, res) => {
  const filters = _req.query
  // const projects = await listAllProjects()
  // return res.status(200).json({ projects })


  try {
    const projects = await listAllProjects(filters)
    return res.status(200).json({ projects })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }


})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const project = await getProjectbyid(id)
  return res.status(200).json({ project })
})

router.post('/', async (req, res) => {
  const project = await addNewProject(req.body)

  return res.status(200).json({ project })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const project = await Editprojs(id, req.body)
  return res.status(200).json({ project })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const project = await deleteproject(id)

  return res.status(200).json({ project })
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params

  const project = await Editprojs(id, req.body)

  return res.status(200).json({ project })
})

module.exports = router
