const express = require('express');
const { listAllProjects, getProjectbyid, addNewProject, Editprojs}= require('./projects.service')

const router = express.Router();

router.get('/', async (_req, res) => {

  const proj = await listAllProjects();
  return res.status(200).json({ hello: 'world'})
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    const proj = await getProjectbyid(id);
    return res.status(200).json(proj)
})

router.post('/', async (req, res) => {
    const newProj = await addNewProject(req.body)

    return res.status(200).json(newProj)
})

router.put('/', async (req, res) => {
    const Editproj = await Editprojs(req.body)

    return res.status(200).json(Editproj)
})