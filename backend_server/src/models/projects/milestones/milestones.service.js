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

async function CreateStone({ title, description, completed, due_date, project_id }) {
    const [newStones] = await db('milestones')
        .insert({
            title,
            description,
            completed,
            due_date: new Date(due_date),
            project_id
        })
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

async function updatedStones(id, { title, description, completed, due_date }) {
    const Stonetoupdate = await db('milestones')
        .where({ id })
        .first();
    
    const [updatestone] = await db('milestones').where({ id }).update({
        ...Stonetoupdate,
        ...{ title, description, completed, due_date: new Date(due_date) }
    }).returning('*');

    return updatestone;
}



module.exports = { getAllstones, getStonesbyid, CreateStone, deleteStone,updatedStones}