const db = require('../../db')

async function getAllPathways(filters) {
  const pathways = await db('pathways')
    .select(
      'pathways.id',
      'pathways.name',
      db.raw(`
      json_agg(
        json_build_object(
          'id', pathway_milestones.id,
          'name', pathway_milestones.name,
          'activities', COALESCE(
            (
              SELECT json_agg(
                json_build_object(
                  'id', pathway_activities.id,
                  'name', pathway_activities.name
                )
              )
              FROM pathway_activities
              WHERE pathway_activities.milestone_id = pathway_milestones.id
            ),
            '[]'
          )
        )
      ) as milestones
    `),
    )
    .leftJoin(
      'pathway_milestones',
      'pathways.id',
      'pathway_milestones.pathway_id',
    )
    .where(filters)
    .orderBy('pathways.id')
    .groupBy('pathways.id')

  return pathways
}

async function getPathwayById(id) {
  const pathway = await db('pathways')
    .select(
      'pathways.id',
      'pathways.name',
      db.raw(`
      json_agg(
        json_build_object(
          'id', pathway_milestones.id,
          'name', pathway_milestones.name,
          'activities', COALESCE(
            (
              SELECT json_agg(
                json_build_object(
                  'id', pathway_activities.id,
                  'name', pathway_activities.name
                )
              )
              FROM pathway_activities
              WHERE pathway_activities.milestone_id = pathway_milestones.id
            ),
            '[]'
          )
        )
      ) as milestones
    `),
    )
    .leftJoin(
      'pathway_milestones',
      'pathways.id',
      'pathway_milestones.pathway_id',
    )
    .where('pathways.id', id)
    .groupBy('pathways.id')
    .first()

  return pathway
}

module.exports = { getAllPathways, getPathwayById }
