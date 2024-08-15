const tables = [
  'users',
  'projects',
  'milestones',
  'tasks',
  'stakeholders',
  'risks',
]

const today = new Date().toISOString().split('T')[0]

const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result.toISOString().split('T')[0]
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries and resets id sequence
  tables.forEach(async (table) => {
    await knex(table).del()
  })

  /**
   * Table: Users
   */
  await knex('users').insert([
    { username: 'jrodriguez', first_name: 'J', last_name: 'Rod', is_pm: true },
    { username: 'tavande', first_name: 'T', last_name: 'Avande' },
    { username: 'ferazo', first_name: 'F', last_name: 'Erazo' },
    { username: 'j-bullard', first_name: 'J', last_name: 'Bullard' },
  ])

  /**
   * Table: Passwords
   */
  await knex('passwords').insert([
    {
      user_id: 1,
      password: '$2b$12$ABST21TAZIz0GEhrAae9F.E6eHX8YI6fEkICIe1ufwBTZqwlsOv42',
    },
    {
      user_id: 2,
      password: '$2b$12$ABST21TAZIz0GEhrAae9F.E6eHX8YI6fEkICIe1ufwBTZqwlsOv42',
    },
    {
      user_id: 3,
      password: '$2b$12$ABST21TAZIz0GEhrAae9F.E6eHX8YI6fEkICIe1ufwBTZqwlsOv42',
    },
    {
      user_id: 4,
      password: '$2b$12$ABST21TAZIz0GEhrAae9F.E6eHX8YI6fEkICIe1ufwBTZqwlsOv42',
    },
  ])

  /**
   * Table: Projects
   */
  await knex('projects').insert([
    {
      name: 'project 1',
      description: 'project description',
      start_date: '04/08/12',
      end_date: '12/12/2024',
      project_manager_id: 1,
    },
    {
      name: 'project 2',
      description: 'project description',
      start_date: '05/06/12',
      end_date: '12/12/2024',
      project_manager_id: 2,
    },
    {
      name: 'project 3',
      description: 'project description',
      start_date: '06/01/12',
      end_date: '12/12/2024',
      project_manager_id: 3,
    },
    {
      name: 'project 4',
      description: 'project description',
      start_date: '07/03/12',
      end_date: '12/12/2024',
      project_manager_id: 4,
    },
  ])

  /**
   * Table: Milestones
   */
  await knex('milestones').insert([
    { title: 'milestone1', project_id: 1 },
    { title: 'milestone2', project_id: 2 },
    { title: 'milestone3', project_id: 3 },
  ])

  /**
   * Table: Tasks
   */
  await knex('tasks').insert([
    {
      title: 'Task 1',
      completed: false,
      start_date: today,
      due_date: addDays(today, 10),
      project_id: 1,
    },
    {
      title: 'Task 2',
      completed: true,
      start_date: today,
      due_date: addDays(today, -5),
      project_id: 1,
    },
    {
      title: 'Task 3',
      completed: false,
      start_date: today,
      due_date: addDays(today, 1),
      project_id: 1,
    },
    {
      title: 'Task 4',
      completed: false,
      start_date: today,
      due_date: addDays(today, 3),
      project_id: 1,
    },
  ])

  /**
   * Table: Stakeholders
   */
  await knex('stakeholders').insert([
    {
      project_id: 1,
      first_name: 'Phineas',
      last_name: 'Flynn',
      role: 'Contractor',
      email: 'summer4ever@doofenschmirtz.com',
      phone: '555-5555',
    },
    {
      project_id: 1,
      first_name: 'Ferb',
      last_name: 'Fletcher',
      role: 'Contractor',
      email: 'soocool@doofenschmirtz.com',
      phone: '555-5556',
    },
    {
      project_id: 1,
      first_name: 'Heinz',
      last_name: 'Doofenschmirtz',
      role: 'Sponsor',
      email: 'eeevillainator@aol.com',
      phone: '555-5554',
    },
  ])

  /**
   * Table: Risks
   */
  await knex('risks').insert([
    {
      description: 'Delay in supply chain delivery',
      probability: 'high',
      impact: 'high',
      status: 'open',
      mitigation_plan: 'Identify alternative suppliers and expedite orders',
      project_id: 1,
    },
    {
      description: 'Technical complexity in new subsystem',
      probability: 'medium',
      impact: 'high',
      status: 'in-progress',
      mitigation_plan:
        'Increase technical oversight and add contingency time to schedule',
      project_id: 1,
    },
    {
      description: 'Regulatory compliance issues',
      probability: 'medium',
      impact: 'medium',
      status: 'open',
      mitigation_plan: 'Consult with legal counsel and regulatory agencies',
      project_id: 2,
    },
    {
      description: 'Insufficient testing resources',
      probability: 'low',
      impact: 'medium',
      status: 'open',
      mitigation_plan: 'Allocate additional resources and prioritize testing',
      project_id: 3,
    },
  ])

  await knex('lessons_learned').insert([
    {
      project_id: 1,
      description:
        'Initial project scoping underestimated the time required for stakeholder approval.',
      recommendation:
        'Include more time in the project schedule for stakeholder review and approval.',
      impact: 'high',
    },
    {
      project_id: 2,
      description:
        'Project team members were not adequately trained on new software tools.',
      recommendation:
        'Provide training and support for new software tools before project start.',
      impact: 'low',
    },
    {
      project_id: 3,
      description:
        'Lack of communication between project team members led to duplication of effort.',
      recommendation:
        'Implement regular team meetings and communication channels to share project updates.',
      impact: 'medium',
    },
    {
      project_id: 4,
      description:
        'Project scope changes were not properly documented and approved by stakeholders.',
      recommendation:
        'Establish a formal change control process to document and approve scope changes.',
      impact: 'high',
    },
  ])

  // Deletes ALL existing entries and resets id sequence
  tables.forEach(async (table) => {
    await knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`)
  })

  console.log('Seeding complete')

  return Promise.resolve(knex)
}
