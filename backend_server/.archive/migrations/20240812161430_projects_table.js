/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  /*     return knex.schema.createTable('projects', function(table){
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();

        table.integer('project_manager_id').unsigned().notNullable();
        table.foreign('project_manager_id').references('id').inTable('users');
    }) */
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  /*     return knex.schema.alterTable('projects', function(table) {
        table.dropForeign('project_manager_id');
    }).then(() => knex.dropTableIfExists('projects')); */
}
