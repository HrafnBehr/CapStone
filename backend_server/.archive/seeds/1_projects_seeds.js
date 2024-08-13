/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('projects').del()
  await knex('projects').insert([
   { name: 'project 1', description: 'project description', start_date: '04/08/12', end_date: '12/12/2024' },
   { name: 'project 2', description: 'project description', start_date: '05/06/12', end_date: '12/12/2024' },
   { name: 'project 3', description: 'project description', start_date: '06/01/12', end_date: '12/12/2024' },
   { name: 'project 4', description: 'project description', start_date: '07/03/12', end_date: '12/12/2024' },
  ]);
};
