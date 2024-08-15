/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  /*     return knex.schema.createTable('tasks', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.boolean('completed').notNullable().defaultTo(false);
        table.timestamp('start_date');
        table.timestamp('due_date');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.integer('project_id').unsigned().notNullable();
        table.foreign('project_id').references('projects.id').onDelete('CASCADE');

        table.integer('milestone_id').unsigned();
        table.foreign('milestone_id').references('milestones.id').onDelete('CASCADE');
    }) */
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  /*     return knex.schema.table('tasks', function(table){
        table.dropForeign('project_id');
        table.dropForeign('milestone_id');
    }).dropTableIfExists('tasks'); */
}
