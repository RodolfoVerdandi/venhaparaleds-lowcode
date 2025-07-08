const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: "postgresql://postgres.znzfjumybhqviopjrntq:FeE6SG150k5u2K9P@aws-0-sa-east-1.pooler.supabase.com:6543/postgres",
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = pool;