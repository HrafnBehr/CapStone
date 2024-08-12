/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Projects').del()
  await knex('Projects').insert([
   { Project_name: 'project 1', Date: '04/08/12'},
   { Project_name: 'project 2', Date: '05/06/12'},
   { Project_name: 'project 3', Date: '06/01/12'},
   { Project_name: 'project 4', Date: '07/03/12'},
  ]);
};
