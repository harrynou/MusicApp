import {Pool} from 'pg';
require('dotenv').config({ path: '../.env'})

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export const connectDB = async (): Promise<void> => {
    try {
        await pool.query("SELECT 1");
        console.log("Database connection established.");
    } catch (error) {
        throw new Error(`Database connection failed: ${error}`);
    }
};

export default pool;