const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.HOST,  
    port: parseInt(process.env.SUPABASE_PORT, 10),
    database: process.env.DATABASE,
    user: process.env.USER,
    pool_mode: process.env.POOL_MODE,
    password: process.env.PASSWORD,  
    ssl: { rejectUnauthorized: false }
})

module.exports = { pool };