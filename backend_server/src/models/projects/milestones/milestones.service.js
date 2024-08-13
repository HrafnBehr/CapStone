const db = require('../../../db');

async function getAllstones(project_id) {
    const stones = await db('milestones').where({ project_id });
    return stones
}

async function getStonesbyid(id) {
    const stones = await db('milestones')    
        .where({id})
        .first();
    return stones;
}

async function CreateStone(stones) {
    const [newStones] = await db('milestones')
        .insert(stones)
        .returning('*');
    return newStones;
}

async function deleteStone(id) {
    const deletedstones = await db('milestones')
        .where({ id })
        .del()
        .returning('*');
    return deletedstones;
}

async function updatedStones(id, stones) {
    const Stonetoupdate = await db('milestones')
        .where({ id })
        .first();
    
    const [updatestone] = await db('milestones').where({ id }).update({
        ...Stonetoupdate,
        ...stones
    }).returning('*');

    return updatestone;
}



module.exports = { getAllstones, getStonesbyid, CreateStone, deleteStone,updatedStones}