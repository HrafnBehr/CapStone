const db = require('../../db')

async function getUserById(id) {
    const user = await db('users').where({ id }).first()
    delete user.password

    return user
}

module.exports = { getUserById }