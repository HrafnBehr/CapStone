/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('risks').del()

  // Restarts id sequence
  await knex.raw('ALTER SEQUENCE risks_id_seq RESTART WITH 1')

  // Seed new data
  await knex('risks').insert([
    { 
      description: 'Delay in supply chain delivery', 
      probability: 'high', 
      impact: 'high', 
      status: 'open', 
      mitigation_plan: 'Identify alternative suppliers and expedite orders', 
      project_id: 6
    },
    { 
      description: 'Technical complexity in new subsystem', 
      probability: 'medium', 
      impact: 'high', 
      status: 'in-progress', 
      mitigation_plan: 'Increase technical oversight and add contingency time to schedule',
      project_id: 6
    },
    { 
      description: 'Regulatory compliance issues', 
      probability: 'medium', 
      impact: 'medium', 
      status: 'open', 
      mitigation_plan: 'Consult with legal counsel and regulatory agencies',
      project_id: 7
    },
    { 
      description: 'Insufficient testing resources', 
      probability: 'low', 
      impact: 'medium', 
      status: 'open', 
      mitigation_plan: 'Allocate additional resources and prioritize testing',
      project_id: 8
    },
  ]);
};
