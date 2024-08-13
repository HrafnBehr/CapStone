/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  await knex('tasks').del()

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];  
  };

  const today = new Date().toISOString().split('T')[0];
  await knex('tasks').insert([
    
    { id: 1, title: 'Task 1', completed: false, start_date: today, due_date: addDays(today, 10), project_id: 1, milestone_id: 1 },
    { id: 1, title: 'Task 2', completed: true, start_date: today, due_date: addDays(today, -5), project_id: 1, milestone_id: 2 },
    { id: 1, title: 'Task 3', completed: false, start_date: today, due_date: addDays(today, 1), project_id: 1, milestone_id: 3 },
    { id: 1, title: 'Task 4', completed: false, start_date: today, due_date: addDays(today, 3), project_id: 1, milestone_id: 4 },

   
  ]);
};
