const db = require("../../db");

async function listAllProjects(params) {
    return await db.select('*').from('projects').orderBy('name');
}

async function getProjectbyid(id) {
    return await db('projects')
        .select('*')    
        .where({id}).first();
}

async function addNewProject({ name, start_date, end_date, description}) {
    const [project] = await db.insert({ description, name, start_date, end_date }).into('projects').returning('*');
    return project;
}

async function Editprojs(id, { name, start_date, end_date, description }) {
    const project = await db('projects').select('*').where({ id }).first()
    
    const [updatedproj] = await db('projects')
        .where({ id })
        .update({
            name: name || project.name,
            start_date: start_date || project.start_date,
            end_date: end_date || project.end_date,
            description: description || project.description
        })
        .returning('*');

    return updatedproj;
}

async function deleteproject(id) {
    const [delprojs] = await db('projects')
        .where({ id })
        .delete()
        .returning('*');
    
    return delprojs;
}



module.exports = { listAllProjects, getProjectbyid, addNewProject, Editprojs, deleteproject}