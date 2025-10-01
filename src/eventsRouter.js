const {pool} = require('./initializeDB');


async function insertNewEvent(types, events, users, payloads, timestamps) {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO events (type, event, "user", payload, timestamp)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await client.query(query, [types, events, users, payloads, timestamps]);
    console.log("Event logged");
  } catch (err) {
    console.error("Failed to store event:", err.message);
  } finally {
    client.release();
  }
}


module.exports = { insertNewEvent };

