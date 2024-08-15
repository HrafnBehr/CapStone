/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Milestone').del()
  await knex('MIlestone').insert([
    { title: 'milestone1' },
    { title: 'milestone2' },
    { title: 'milestone3' },
  ])
}
