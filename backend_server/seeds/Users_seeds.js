/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').del()
  await knex('Users').insert([
    { username: 'jrodriguez', password: 'insertpassword123', role: 'Program Manager' },
    { username: 'tavande', password: 'insertpassword123', role: 'Tester'  },
    { username: 'ferazo',  password: 'insertpassword123', role: 'Tester'},
    { username: 'jbullard',  password: 'insertpassword123', role: 'Program Manager'},
  ]);
};
