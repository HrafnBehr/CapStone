/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').del()
  await knex('Users').insert([
    { username: 'jrodriguez', password: 'insertpassword123', first_name: 'J', last_name:'Rod' },
    { username: 'tavande', password: 'insertpassword123', first_name: 'T', last_name:'Avande' },
    { username: 'ferazo',  password: 'insertpassword123', first_name: 'F', last_name:'Erazo', is_pm: true },
    { username: 'jbullard',  password: 'insertpassword123', first_name: 'J', last_name:'Bullard' },
  ]);
};
