import {createPool} from 'mysql2/promise';
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Esc4l0n3t4',
    port: 3306,
    database: 'stock'
});

