import { pool } from './src/db.js';

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database!');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        console.error('Error stack:', error.stack);
    }
};

testConnection();