const db = require('../../db')

async function getAllUsers() {
    const users = await db('users')

    return users
}

async function getUserById(id) {
    const user = await db('users').where({ id }).first()
    
    return user
}

module.exports = { getUserById, getAllUsers }