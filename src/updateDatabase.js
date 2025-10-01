/*
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
*/


//const { Pool } = require('pg');
const {pool} = require('./initializeDB');

async function insertProjectAndPhases(newProject) {
  // Use your Supabase connection string
  /*
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false   // Required for Supabase SSL
    }
  });
  */
/*
  const pool = new Pool({
    host: '2600:1f16:1cd0:3316:a7eb:bfd0:320c:dbda',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Protiusgreenfuture26',  
    ssl: { rejectUnauthorized: false }
  });
  */

  /*
  const pool = new Pool({
    host: 'aws-1-us-east-2.pooler.supabase.com',  
    port: 6543,
    database: 'postgres',
    user: 'postgres.oaecaccsvnxhqhhbuiqm',
    pool_mode: 'transaction',
    password: 'Protiusgreenfuture26',  
    ssl: { rejectUnauthorized: false }
  });
  */

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