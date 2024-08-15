/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  /*     return knex.schema.createTable('milestones', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').nullable();
        table.boolean('completed').notNullable().defaultTo(false);
        table.timestamp('due_date');

        table.integer('project_id').unsigned()
        table.foreign('project_id').references('projects.id').onDelete('CASCADE');
    }) */
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  /*     return knex.schema.table('milestones', function(table){
        table.dropForeign('project_id');
    }).dropTableIfExists('milestones'); */
}
