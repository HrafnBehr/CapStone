/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  /*     return knex.schema.createTable('stakeholders', function(table) {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('role').notNullable();
      table.string('email').notNullable();
      table.string('phone').notNullable();
      
      table.integer('project_id').unsigned().notNullable();
      table.foreign('project_id').references('projects.id').onDelete('CASCADE')
    }
  ) */
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  /*   return knex.schema.table('stakeholders', function(table){
    table.dropForeign('project_id');
  }).dropTableIfExists('stakeholders');  */
}
