const { Pool } = require('pg');

const pool = new Pool({
    host: 'aws-1-us-east-2.pooler.supabase.com',  
    port: 6543,
    database: 'postgres',
    user: 'postgres.oaecaccsvnxhqhhbuiqm',
    pool_mode: 'transaction',
    password: 'Protiusgreenfuture26',  
    ssl: { rejectUnauthorized: false }
})

module.exports = {pool};