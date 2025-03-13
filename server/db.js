import pkg from 'pg';
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pkg;


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: { rejectUnauthorized: false },
    // host: "db.dpbuefqameottuigelnk.supabase.co",
    // port: 5432,
});

pool.connect()
    .then(() => console.log('Connected!'))
    .catch(err => console.error('Error connecting:', err));

export default pool