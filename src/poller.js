const mysql = require("mysql2/promise");

//Database configuration (MySQL)
const dbconfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'project@2025',
    database: 'protius'
  }

function startChecking(io) {
  async function checkDBUpdates(){
    const conn = await mysql.createConnection(dbconfig);
    const [rows] = await conn.execute(
      `SELECT * FROM events`
    )
    await conn.end();

    rows.forEach(item => {
      const eventt = {
        source: "database",
        event: item.event,
        user: item.user,
        data: item.payload,
        timestamp: item.timestamp
      };
      //console.log(event);
      io.emit("message", eventt);
    });
    
  };
  setInterval(checkDBUpdates, 60000);
}

module.exports = { startChecking };

  