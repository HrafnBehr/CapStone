const tables = [
  'users',
  'passwords',
  'pathways',
  'pathway_milestones',
  'pathway_activities',
  'projects',
  'project_tasks',
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries and resets id sequence
  tables.forEach(async (table) => {
    await knex(table).del()
    await knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`)
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
   * Table: pathways
   */
  await knex('pathways').insert([
    { /* id: 1 */ name: 'Urgent Capability Acuisition' },
    { /* id: 2 */ name: 'Middle Tier of Acquisition' },
    { /* id: 3 */ name: 'Major Capability Acquisition' },
    { /* id: 4 */ name: 'Software Acquisition' },
    { /* id: 5 */ name: 'Defense Business Systems' },
    { /* id: 6 */ name: 'Acquisition of Services' },
  ]);

  /**
   * Table: pathway_milestones
   */
  await knex('pathway_milestones').insert([
    { /* id: 1 */ pathway_id: 3, name: 'Milestone A' },
    { /* id: 2 */ pathway_id: 3, name: 'Milestone B' },
    { /* id: 3 */ pathway_id: 3, name: 'Milestone C' },
  ]);

  /**
   * Table: pathway_activities
   */
  await knex('pathway_activities').insert([
    { /* id: 1 */ milestone_id: 1, pathway_id: 3, name: 'Develop Requirements' },
    { /* id: 2 */ milestone_id: 1, pathway_id: 3, name: 'Analysis of Alternatives' },
    { /* id: 3 */ milestone_id: 2, pathway_id: 3, name: 'Prototypes' },
    { /* id: 4 */ milestone_id: 2, pathway_id: 3, name: 'Design System' },
    { /* id: 5 */ milestone_id: 2, pathway_id: 3, name: 'Develop System' },
    { /* id: 6 */ milestone_id: 2, pathway_id: 3, name: 'Test and Evaluate System' },
    { /* id: 7 */ milestone_id: 3, pathway_id: 3, name: 'Produce System' },
    { /* id: 8 */ milestone_id: 3, pathway_id: 3, name: 'Sustain System' },
  ]);

  /**
   * Table: Projects
   */
  await knex('projects').insert([
    {
       /* id: 1 */
      name: 'Next-Generation Fighter Aircraft',
      description:
        'Development of a new fighter aircraft to replace the current fleet.',
      start_date: '2024-01-01',
      end_date: '2030-12-31',
      project_manager_id: 2,
      pathway_id: 3,
    },
    {
       /* id: 2 */
      name: 'Advanced Tactical Missile System',
      description:
        'Development of a long-range, precision-guided missile system.',
      start_date: '2023-06-15',
      end_date: '2028-09-30',
      project_manager_id: 3,
      pathway_id: 3,
    },
    {
       /* id: 3 */
      name: 'Cybersecurity Operations Platform',
      description:
        'Creation of an integrated cybersecurity operations platform for real-time threat detection.',
      start_date: '2024-03-01',
      end_date: '2026-12-31',
      project_manager_id: 1,
      pathway_id: 3,
    },
    {
       /* id: 4 */
      name: 'Future Combat Systems',
      description:
        'Development of an integrated system of manned and unmanned ground vehicles.',
      start_date: '2025-02-01',
      end_date: '2032-06-30',
      project_manager_id: 4,
      pathway_id: 3,
    },
    {
       /* id: 5 */
      name: 'Satellite Communication Network',
      description:
        'Deployment of a global satellite communication network for secure military communication.',
      start_date: '2023-08-01',
      end_date: '2027-11-15',
      project_manager_id: 3,
      pathway_id: 3,
    },
  ])

  /**
   * Table: project_tasks
   */
  await knex('project_tasks').insert([
    {
      project_id: 1,
      title: 'DOT&E',
      start_date: '2025-06-01',
      end_date: '2025-06-15',
      pathway_id: 3,
      milestone_id: 2,
      activity_id: 6
    },
    {
      project_id: 1,
      title: 'IOT&E',
      start_date: '2025-06-01',
      end_date: '2025-06-15',
      pathway_id: 3,
      milestone_id: 2,
      activity_id: 6
    },
    {
      project_id: 1,
      title: 'FOT&E',
      start_date: '2025-06-01',
      end_date: '2025-06-15',
      pathway_id: 3,
      milestone_id: 2,
      activity_id: 6
    },
  ])

  // /**
  //  * Table: Stakeholders
  //  */
  // await knex('stakeholders').insert([
  //   {
  //     project_id: 1,
  //     first_name: 'Phineas',
  //     last_name: 'Flynn',
  //     role: 'Contractor',
  //     email: 'summer4ever@doofenschmirtz.com',
  //     phone: '555-5555',
  //   },
  //   {
  //     project_id: 1,
  //     first_name: 'Ferb',
  //     last_name: 'Fletcher',
  //     role: 'Contractor',
  //     email: 'soocool@doofenschmirtz.com',
  //     phone: '555-5556',
  //   },
  //   {
  //     project_id: 1,
  //     first_name: 'Heinz',
  //     last_name: 'Doofenschmirtz',
  //     role: 'Sponsor',
  //     email: 'eeevillainator@aol.com',
  //     phone: '555-5554',
  //   },
  // ])

  // /**
  //  * Table: Risks
  //  */
  // await knex('risks').insert([
  //   {
  //     description: 'Delay in supply chain delivery',
  //     probability: 'high',
  //     impact: 'high',
  //     status: 'open',
  //     mitigation_plan: 'Identify alternative suppliers and expedite orders',
  //     project_id: 1,
  //   },
  //   {
  //     description: 'Technical complexity in new subsystem',
  //     probability: 'medium',
  //     impact: 'high',
  //     status: 'in-progress',
  //     mitigation_plan:
  //       'Increase technical oversight and add contingency time to schedule',
  //     project_id: 1,
  //   },
  //   {
  //     description: 'Regulatory compliance issues',
  //     probability: 'medium',
  //     impact: 'medium',
  //     status: 'open',
  //     mitigation_plan: 'Consult with legal counsel and regulatory agencies',
  //     project_id: 2,
  //   },
  //   {
  //     description: 'Insufficient testing resources',
  //     probability: 'low',
  //     impact: 'medium',
  //     status: 'open',
  //     mitigation_plan: 'Allocate additional resources and prioritize testing',
  //     project_id: 3,
  //   },
  // ])

  // await knex('lessons_learned').insert([
  //   {
  //     project_id: 1,
  //     description:
  //       'Initial project scoping underestimated the time required for stakeholder approval.',
  //     recommendation:
  //       'Include more time in the project schedule for stakeholder review and approval.',
  //     impact: 'high',
  //   },
  //   {
  //     project_id: 2,
  //     description:
  //       'Project team members were not adequately trained on new software tools.',
  //     recommendation:
  //       'Provide training and support for new software tools before project start.',
  //     impact: 'low',
  //   },
  //   {
  //     project_id: 3,
  //     description:
  //       'Lack of communication between project team members led to duplication of effort.',
  //     recommendation:
  //       'Implement regular team meetings and communication channels to share project updates.',
  //     impact: 'medium',
  //   },
  //   {
  //     project_id: 4,
  //     description:
  //       'Project scope changes were not properly documented and approved by stakeholders.',
  //     recommendation:
  //       'Establish a formal change control process to document and approve scope changes.',
  //     impact: 'high',
  //   },
  // ])

  console.log('Seeding complete')

  return Promise.resolve(knex)
}
