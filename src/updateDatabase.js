const {pool} = require('./initializeDB');

async function insertProjectAndPhases(newProject) {

  const client = await pool.connect();
  console.log("Connected to Supabase database");

  try {
    await client.query('BEGIN');

    // Insert project
    const insertProjectQuery = `
      INSERT INTO projects_table (
        id,
        owner,
        project_name,
        developer,
        finance,
        dev_contribution,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await client.query(insertProjectQuery, [
      newProject.projectID,
      newProject.projOwner,
      newProject.projectName,
      newProject.projectDeveloper,
      newProject.projectFinance,
      newProject.developerContribution,
      newProject.projectStatus
    ]);

    // Insert phases
    const insertPhaseQuery = `
      INSERT INTO project_phases (
        id
      ) VALUES ($1)
    `;

    await client.query(insertPhaseQuery, [
      newProject.projectID
    ]);


    await client.query('COMMIT');
    console.log('Insert successful');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Insert failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

module.exports = { insertProjectAndPhases };