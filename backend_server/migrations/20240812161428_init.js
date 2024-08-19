/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  /**
   * Table: users
   */
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username').unique().notNullable()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.boolean('is_pm').notNullable().defaultTo(false)

    table.timestamps(true, true)
  })

  /**
   * Table: passwords
   */
  await knex.schema.createTable('passwords', (table) => {
    table.increments('id').primary()
    table.string('password').notNullable()

    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')

    table.timestamps(true, true)
  })

  /**
   * Table: pathways
   */
  await knex.schema.createTable('pathways', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()

    table.timestamps(true, true)
  })

  /**
   * Table: pathway_milestones
   */
  await knex.schema.createTable('pathway_milestones', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()

    table.integer('pathway_id').unsigned().notNullable()
    table.foreign('pathway_id').references('pathways.id').onDelete('CASCADE')

    table.timestamps(true, true)
  })

  /**
   * Table: pathway_activities
   */
  await knex.schema.createTable('pathway_activities', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()

    table.integer('pathway_id').unsigned().notNullable()
    table.foreign('pathway_id').references('pathways.id').onDelete('CASCADE')

    table.integer('milestone_id').unsigned().notNullable()
    table
      .foreign('milestone_id')
      .references('pathway_milestones.id')
      .onDelete('CASCADE')

    table.timestamps(true, true)
  })

  /**
   * Table: projects
   */
  await knex.schema.createTable('projects', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.timestamp('start_date').notNullable()
    table.timestamp('end_date').notNullable()

    table.integer('project_manager_id').unsigned()
    table.foreign('project_manager_id').references('id').inTable('users')

    table.integer('pathway_id').unsigned().notNullable()
    table.foreign('pathway_id').references('pathways.id').onDelete('CASCADE')

    table.timestamps(true, true)
  })

  /**
   * Table: project_tasks
   */
  await knex.schema.createTable('project_tasks', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.timestamp('start_date').notNullable()
    table.timestamp('end_date').notNullable()

    table.integer('project_id').unsigned().notNullable()
    table.foreign('project_id').references('projects.id').onDelete('CASCADE')

    table.integer('pathway_id').unsigned().notNullable()
    table.foreign('pathway_id').references('pathways.id').onDelete('CASCADE')

    table.integer('milestone_id').unsigned().notNullable()
    table
      .foreign('milestone_id')
      .references('pathway_milestones.id')
      .onDelete('CASCADE')

    table.integer('activity_id').unsigned()
    table
      .foreign('activity_id')
      .references('pathway_activities.id')
      .onDelete('CASCADE')

    table.timestamps(true, true)
  })

  /**
   * Table: Stakeholders
   */
  /*   await knex.schema.createTable('stakeholders', (table) => {
      table.increments('id').primary()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('role').notNullable()
      table.string('email').notNullable()
      table.string('phone').notNullable()

      table.integer('project_id').unsigned().notNullable()
      table.foreign('project_id').references('projects.id').onDelete('CASCADE')

      table.timestamps(true, true)
    }) */

  /**
   * Table: Risks
   */
  /*   await knex.schema.createTable('risks', (table) => {
      table.increments().primary()
      table.string('description').notNullable()
      table.string('probability').notNullable().defaultTo('low')
      table.string('impact').notNullable().defaultTo('low')
      table.string('mitigation_plan')
      table.string('status').notNullable().defaultTo('open')

      table.integer('project_id').unsigned().notNullable()
      table.foreign('project_id').references('projects.id').onDelete('CASCADE')

      table.timestamps(true, true)
    }) */

  /**
   * Table: lessons_learned
   */
  /*   await knex.schema.createTable('lessons_learned', (table) => {
      table.increments().primary()
      table.string('description').notNullable()
      table.string('recommendation')
      table.string('impact').notNullable().defaultTo('low')

      table.integer('project_id').unsigned().notNullable()
      table.foreign('project_id').references('projects.id').onDelete('CASCADE')

      table.integer('milestone_id').unsigned()
      table
        .foreign('milestone_id')
        .references('milestones.id')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    }) */

  return Promise.resolve(knex)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // // Drop lessons_learned table
  // await knex
  //   .table('lessons_learned', (table) => {
  //     table.dropForeign('project_id')
  //     table.dropForeign('milestone_id')
  //   })
  //   .then(() => knex.schema.dropTableIfExists('lessons_learned'))

  // // Drop risks table
  // await knex.schema
  //   .alterTable('risks', (table) => {
  //     table.dropForeign('project_id')
  //   })
  //   .then(() => knex.schema.dropTableIfExists('risks'))

  // // Drop stakeholders table
  // await knex.schema
  //   .alterTable('stakeholders', (table) => {
  //     table.dropForeign('project_id')
  //   })
  //   .then(() => knex.schema.dropTableIfExists('stakeholders'))

  // Drop tasks table
  await knex.schema
    .alterTable('project_tasks', (table) => {
      table.dropForeign('project_id')
      table.dropForeign('pathway_id')
      table.dropForeign('milestone_id')
      table.dropForeign('activity_id')
    })
    .then(() => knex.schema.dropTableIfExists('project_tasks'))

  // Drop pathway_activities table
  await knex.schema
    .alterTable('pathway_activities', (table) => {
      table.dropForeign('milestone_id')
      table.dropForeign('pathway_id')
    })
    .then(() => knex.schema.dropTableIfExists('pathway_activities'))

  // Drop pathway_activities table
  await knex.schema
    .alterTable('pathway_milestones', (table) => {
      table.dropForeign('pathway_id')
    })
    .then(() => knex.schema.dropTableIfExists('pathway_milestones'))

  // Drop projects table
  await knex.schema
    .alterTable('projects', (table) => {
      table.dropForeign('project_manager_id')
      table.dropForeign('pathway_id')
    })
    .then(() => knex.schema.dropTableIfExists('projects'))

  // Drop passwords table
  await knex.schema
    .alterTable('passwords', (table) => {
      table.dropForeign('user_id')
    })
    .then(() => knex.schema.dropTableIfExists('passwords'))

  // Drop pathways table
  await knex.schema.dropTableIfExists('pathways')

  // Drop users table
  await knex.schema.dropTableIfExists('users')

  return Promise.resolve(knex)
}
