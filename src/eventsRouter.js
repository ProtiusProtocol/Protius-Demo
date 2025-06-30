const mysql = require("mysql2/promise");

const dbconfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'project@2025',
    database: 'protius'
  }


async function insertNewEvent(types, events, users, payloads, timestamps) {
  const conn = await mysql.createConnection(dbconfig);
    try {
      await conn.execute(
        "INSERT INTO events (type, event, user, payload, timestamp) VALUES (?, ?, ?, ?, ?)",
        [types, events, users, payloads, timestamps]
      );
      
      console.log("Event logged" );
    } catch (err) {
      console.error("Failed to store event:", err.message);
    }
  };


module.exports = { insertNewEvent };
