import pkg from 'pg';
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: "db.dpbuefqameottuigelnk.supabase.co",
    port: 5432,
    allowExitOnIdle: true
});

export default pool;
