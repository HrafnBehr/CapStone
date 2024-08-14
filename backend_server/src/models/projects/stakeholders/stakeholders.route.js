const express = require('express');
const { getAllstakes, getStakesbyid, CreateStake, deleteStake, updateStake } = require('./stakeholders.service')

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { projectId } = req.params;

    try {
        const stakes = await getAllstakes(projectId);
        res.status(200).json({stakes})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    });

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    
    try {
        const stakes = await getStakesbyid(id);
        res.status(200).json({stakes})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/', async (req, res) => {
    const { stakes } = req.body;
    
    try {
        const newStakes = await CreateStake(stakes);
        res.status(200).json({ stakes: newStakes });
    } catch (err) {
        res.status(500).jsom({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const stakes = await deleteStake(id);
        res.status(200).json({stakes})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch('/:id', async (req, res ) => {
    const { id } = req.params;
    const {stakes} = req.body;
    
    try{
        const updatedStakes = await updatestake(id, stakes);
         res.status(200).json({ stakes: updatedStakes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router