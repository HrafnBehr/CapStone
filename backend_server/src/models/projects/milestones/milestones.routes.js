const express = require('express');
const { getAllstones, getStonesbyid, CreateStone, deleteStone, updatedStones} = require('./milestones.service')

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { projectId } = req.params;

    try {
        const stones = await getAllstones(projectId);
        res.status(200).json({stones})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    });

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    
    try {
        const stones = await getStonesbyid(id);
        res.status(200).json({stones})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/', async (req, res) => {
    const { stones } = req.body;
    
    try {
        const newStones = await CreateStone(stones);
        res.status(200).json({ stones: newStones });
    } catch (err) {
        res.status(500).jsom({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const stones = await deleteStone(id);
        res.status(200).json({stones})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch('/:id', async (req, res ) => {
    const { id } = req.params;
    const {stones} = req.body;
    
    try{
        const updatedStones = await updatestone(id, stones);
         res.status(200).json({ stones: updatedStones });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router