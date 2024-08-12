/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Projects', function(table){
        table.increments('id'),
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Projects');
};
