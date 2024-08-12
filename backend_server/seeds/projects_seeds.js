/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Projects').del()
  await knex('Projects').insert([
   { name: 'project 1', start_date: '04/08/12', end_date: '12/12/2024' },
   { name: 'project 2', start_date: '05/06/12', end_date: '12/12/2024' },
   { name: 'project 3', start_date: '06/01/12', end_date: '12/12/2024' },
   { name: 'project 4', start_date: '07/03/12', end_date: '12/12/2024' },
  ]);
};
