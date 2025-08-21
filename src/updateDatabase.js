
const mysql = require('mysql2');

async function insertProjectAndPhases(newProject) {
  const conn = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'project@2025',
    database: 'protius'
  }).promise();
  console.log("Connected to database");

  try {
    await conn.beginTransaction();

    // Insert project
    await conn.execute(
      `INSERT INTO projects (projectID, projOwner, projectName, projectDeveloper, projectStatus, projectFinance, developerContribution)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        newProject.projectID,
        newProject.projOwner,
        newProject.projectName,
        newProject.projectDeveloper,
        newProject.projectStatus,
        newProject.projectFinance,
        newProject.developerContribution
      ]
    );

    // Insert phases
    const phaseEntries = Object.entries(newProject.projectPhases);
    const phaseInserts = phaseEntries.map(([phaseName, phaseStatus]) =>
      conn.execute(
        `INSERT INTO project_phases (projectID, phaseName, phaseStatus)
         VALUES (?, ?, ?)`,
        [newProject.projectID, phaseName, phaseStatus]
      )
    );

    await Promise.all(phaseInserts);

    await conn.commit();
    console.log('Insert successful');
  } catch (err) {
    await conn.rollback();
    console.error('Insert failed:', err);
    throw err;
  } finally {
    await conn.end();
  }
}

//module.exports = { insertProjectAndPhases };
