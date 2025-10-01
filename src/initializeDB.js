const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.HOST,  
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    pool_mode: process.env.POOL_MODE,
    password: process.env.PASSWORD,  
    ssl: { rejectUnauthorized: false }
})

module.exports = {pool};