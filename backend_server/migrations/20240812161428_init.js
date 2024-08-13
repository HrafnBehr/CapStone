/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  /**
   * Table: Users
   */
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })

  /**
   * Table: Passwords
   */
  await knex.schema.createTable('passwords', (table) => {
    table.increments('id').primary();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });

  /**
   * Table: Projects
   */
  await knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.timestamp('start_date').notNullable();
    table.timestamp('end_date').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.integer('project_manager_id').unsigned().notNullable();
    table.foreign('project_manager_id').references('id').inTable('users');
  })

  /**
   * Table: Milestones
   */
  await knex.schema.createTable('milestones', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').nullable();
    table.boolean('completed').notNullable().defaultTo(false);
    table.timestamp('due_date');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.integer('project_id').unsigned()
    table.foreign('project_id').references('projects.id').onDelete('CASCADE');
  })

  /**
   * Table: Tasks
   */
  await knex.schema.createTable('tasks', (table) => {
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
  })

  /**
   * Table: Stakeholders
   */
  await knex.schema.createTable('stakeholders', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('role').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.integer('project_id').unsigned().notNullable();
    table.foreign('project_id').references('projects.id').onDelete('CASCADE');
  })

  /**
   * Table: Risks
   */
  await knex.schema.createTable('risks', (table) => {
    table.increments().primary();
    table.string('description').notNullable();
    table.string('probability').notNullable().defaultTo('low');
    table.string('impact').notNullable().defaultTo('low');
    table.string('mitigation_plan');
    table.string('status').notNullable().defaultTo('open');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.integer('project_id').unsigned().notNullable();
    table.foreign('project_id').references('projects.id').onDelete('CASCADE');
  })

  return Promise.resolve(knex);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {

  // Drop risks table
  await knex.schema.alterTable('risks', (table) => {
    table.dropForeign('project_id');
  }).then(() => knex.schema.dropTableIfExists('risks'));

  // Drop stakeholders table
  await knex.schema.alterTable('stakeholders', (table) => {
    table.dropForeign('project_id');
  }).then(() => knex.schema.dropTableIfExists('stakeholders'));

  // Drop tasks table
  await knex.schema.alterTable('tasks', (table) => {
    table.dropForeign('project_id');
    table.dropForeign('milestone_id');
  }).then(() => knex.schema.dropTableIfExists('tasks'));

  // Drop milestones table
  await knex.schema.alterTable('milestones', (table) => {
    table.dropForeign('project_id');
  }).then(() => knex.schema.dropTableIfExists('milestones'));

  // Drop projects table
  await knex.schema.alterTable('projects', (table) => {
    table.dropForeign('project_manager_id');
  }).then(() => knex.schema.dropTableIfExists('projects'));

  // Drop passwords table
  await knex.schema.alterTable('passwords', (table) => {
    table.dropForeign('user_id');
  }).then(() => knex.schema.dropTableIfExists('passwords'));

  // Drop users table
  await knex.schema.dropTableIfExists('users');

  return Promise.resolve(knex);
};
