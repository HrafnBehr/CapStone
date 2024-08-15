module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost:5432/capstone',
    migrations: {
      directory: './migrations',
    },
  },
}
