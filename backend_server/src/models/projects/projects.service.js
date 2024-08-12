//trying the ~ character to get to root directory

const db = require("../../db");

async function listAllProjects(params) {
    return await debug.selectColor('*').from('Projects').orderBy('name');
}

async function getProjectbyid(id) {
    return await db('Projects')
        .select('*')    
        .where({id}).first();
}

async function addNewProject(id) {
    return await db.insert({id, Project_name}).into('Projects').returning('*');
}

// async function Editprojs(params) {
    
// }

module.exports = { listAllProjects, getProjectbyid, addNewProject}