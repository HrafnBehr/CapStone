/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  /*   return knex.schema.createTable('risks', function (table) {
    table.increments().primary()
    table.string('description').notNullable()
    table.string('probability').notNullable().defaultTo('low')
    table.string('impact').notNullable().defaultTo('low')
    table.string('mitigation_plan')
    table.string('status').notNullable().defaultTo('open')

    table.integer('project_id').unsigned().notNullable()
    table.foreign('project_id').references('projects.id').onDelete('CASCADE')
  }) */
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  /*   return knex.schema.alterTable('risks', function (table) {
    table.dropForeign('project_id')
    table.dropColumn('project_id')
  }).then(() => knex.schema.dropTableIfExists('risks')) */
}
