const tables = [
  'users',
  'projects',
  'milestones',
  'tasks',
  'stakeholders',
  'risks',
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
   * Table: Projects
   */
  await knex('projects').insert([
    {
      id: 1,
      name: 'Next-Generation Fighter Aircraft',
      description:
        'Development of a new fighter aircraft to replace the current fleet.',
      start_date: '2024-01-01',
      end_date: '2030-12-31',
      project_manager_id: 2,
    },
    {
      id: 2,
      name: 'Advanced Tactical Missile System',
      description:
        'Development of a long-range, precision-guided missile system.',
      start_date: '2023-06-15',
      end_date: '2028-09-30',
      project_manager_id: 3,
    },
    {
      id: 3,
      name: 'Cybersecurity Operations Platform',
      description:
        'Creation of an integrated cybersecurity operations platform for real-time threat detection.',
      start_date: '2024-03-01',
      end_date: '2026-12-31',
      project_manager_id: 1,
    },
    {
      id: 4,
      name: 'Future Combat Systems',
      description:
        'Development of an integrated system of manned and unmanned ground vehicles.',
      start_date: '2025-02-01',
      end_date: '2032-06-30',
      project_manager_id: 4,
    },
    {
      id: 5,
      name: 'Satellite Communication Network',
      description:
        'Deployment of a global satellite communication network for secure military communication.',
      start_date: '2023-08-01',
      end_date: '2027-11-15',
      project_manager_id: 3,
    },
  ])

  /**
   * Table: Milestones
   */
  await knex('milestones').insert([
    {
      id: 1,
      project_id: 1,
      name: 'Milestone A',
      description: 'Technology Maturation & Risk Reduction Decision',
      due_date: '2025-03-15',
    },
    {
      id: 2,
      project_id: 1,
      name: 'Milestone B',
      description: 'Engineering and Manufacturing Development Decision',
      due_date: '2027-06-22',
    },
    {
      id: 3,
      project_id: 1,
      name: 'Milestone C',
      description: 'Production Decision',
      due_date: '2029-09-10',
    },
    {
      id: 4,
      project_id: 1,
      name: 'Milestone FRP',
      description: 'Full-Rate Production Decision',
      due_date: '2030-11-01',
    },
    {
      id: 5,
      project_id: 2,
      name: 'Milestone A',
      description: 'Technology Maturation & Risk Reduction Decision',
      due_date: '2024-01-10',
    },
    {
      id: 6,
      project_id: 2,
      name: 'Milestone B',
      description: 'Engineering and Manufacturing Development Decision',
      due_date: '2025-06-30',
    },
    {
      id: 7,
      project_id: 2,
      name: 'Milestone C',
      description: 'Production Decision',
      due_date: '2026-11-05',
    },
    {
      id: 8,
      project_id: 2,
      name: 'Milestone FRP',
      description: 'Full-Rate Production Decision',
      due_date: '2028-07-20',
    },
    {
      id: 9,
      project_id: 3,
      name: 'Milestone A',
      description: 'Technology Maturation & Risk Reduction Decision',
      due_date: '2023-12-15',
    },
    {
      id: 10,
      project_id: 3,
      name: 'Milestone B',
      description: 'Engineering and Manufacturing Development Decision',
      due_date: '2024-09-17',
    },
    {
      id: 11,
      project_id: 3,
      name: 'Milestone C',
      description: 'Production Decision',
      due_date: '2025-12-20',
    },
    {
      id: 12,
      project_id: 3,
      name: 'Milestone FRP',
      description: 'Full-Rate Production Decision',
      due_date: '2026-10-05',
    },
    {
      id: 13,
      project_id: 4,
      name: 'Milestone A',
      description: 'Technology Maturation & Risk Reduction Decision',
      due_date: '2025-05-01',
    },
    {
      id: 14,
      project_id: 4,
      name: 'Milestone B',
      description: 'Engineering and Manufacturing Development Decision',
      due_date: '2027-08-25',
    },
    {
      id: 15,
      project_id: 4,
      name: 'Milestone C',
      description: 'Production Decision',
      due_date: '2028-01-12',
    },
    {
      id: 16,
      project_id: 4,
      name: 'Milestone FRP',
      description: 'Full-Rate Production Decision',
      due_date: '2030-03-18',
    },
    {
      id: 17,
      project_id: 5,
      name: 'Milestone A',
      description: 'Technology Maturation & Risk Reduction Decision',
      due_date: '2024-02-20',
    },
    {
      id: 18,
      project_id: 5,
      name: 'Milestone B',
      description: 'Engineering and Manufacturing Development Decision',
      due_date: '2025-09-12',
    },
    {
      id: 19,
      project_id: 5,
      name: 'Milestone C',
      description: 'Production Decision',
      due_date: '2026-11-30',
    },
    {
      id: 20,
      project_id: 5,
      name: 'Milestone FRP',
      description: 'Full-Rate Production Decision',
      due_date: '2027-10-15',
    },
  ])

  /**
   * Table: Tasks
   */
  await knex('tasks').insert([
    {
      id: 1,
      project_id: 1,
      milestone_id: 1,
      title: 'Technology Development',
      description:
        'Develop and validate the technology to be used in the new fighter aircraft.',
      start_date: '2024-01-15',
      due_date: '2025-06-01',
      status: 'In Progress',
    },
    {
      id: 2,
      project_id: 1,
      milestone_id: 1,
      title: 'DOT&E',
      description:
        'Director, Operational Test and Evaluation - Initial testing of technology prototypes.',
      start_date: '2025-06-01',
      due_date: '2025-06-15',
      status: 'Pending',
    },
    {
      id: 3,
      project_id: 1,
      milestone_id: 2,
      title: 'Engineering & Manufacturing Development',
      description: 'Design and prototype the new fighter aircraft.',
      start_date: '2026-01-10',
      due_date: '2027-10-10',
      status: 'Pending',
    },
    {
      id: 4,
      project_id: 1,
      milestone_id: 2,
      title: 'IOT&E',
      description:
        'Initial Operational Test & Evaluation - Assess the operational effectiveness of the fighter aircraft.',
      start_date: '2027-10-10',
      due_date: '2027-11-30',
      status: 'Pending',
    },
    {
      id: 5,
      project_id: 2,
      milestone_id: 3,
      title: 'Low-Rate Initial Production',
      description: 'Begin production of the first set of tactical missiles.',
      start_date: '2026-01-01',
      due_date: '2026-11-05',
      status: 'Completed',
    },
    {
      id: 6,
      project_id: 2,
      milestone_id: 3,
      title: 'FOT&E',
      description:
        'Follow-on Operational Test & Evaluation - Further testing after initial production.',
      start_date: '2027-01-15',
      due_date: '2028-03-15',
      status: 'Pending',
    },
    {
      id: 7,
      project_id: 3,
      milestone_id: 4,
      title: 'Software Development',
      description:
        'Develop core functionalities for the cybersecurity platform.',
      start_date: '2024-04-01',
      due_date: '2025-12-02',
      status: 'In Progress',
    },
    {
      id: 8,
      project_id: 3,
      milestone_id: 4,
      title: 'Cyber Penetration Testing',
      description:
        'Simulated cyber-attacks to assess the security of the platform.',
      start_date: '2025-12-02',
      due_date: '2025-12-15',
      status: 'Pending',
    },
    {
      id: 9,
      project_id: 4,
      milestone_id: 5,
      title: 'System Integration',
      description:
        'Integrate all subsystems of Future Combat Systems into a cohesive unit.',
      start_date: '2026-01-01',
      due_date: '2028-01-12',
      status: 'Pending',
    },
    {
      id: 10,
      project_id: 4,
      milestone_id: 5,
      title: 'Live Fire Testing',
      description: 'Testing the combat systems under live fire conditions.',
      start_date: '2028-05-01',
      due_date: '2028-05-22',
      status: 'Pending',
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

  console.log('Seeding complete')

  return Promise.resolve(knex)
}
