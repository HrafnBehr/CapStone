/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    await knex('stakeholders').del()

    ////
    await knex('stakeholders').insert([
      //  { id: , project_id: , first_name: , lastname: , role: , email: , phone: }
      { id: 1, project_id: 1, first_name: 'Phineas', lastname: 'Flynn', role: 'Contractor' , email: 'summer4ever@doofenschmirtz.com', phone: '555-5555'},
      { id: 2, project_id: 1, first_name: 'Ferb', lastname: 'Fletcher', role: 'Contractor', email: 'soocool@doofenschmirtz.com', phone: '555-5556'},
      { id: 3, project_id: 1, first_name: 'Heinz', lastname: 'Doofenschmirtz', role: 'Sponsor', email: 'eeevillainator@aol.com', phone: '555-5554'}
    
    ]);
  };
