import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',         // Replace with your PostgreSQL username
  host: 'localhost',             // Use your PostgreSQL host (localhost for local setup)
  database: 'task_management_system',   // The database you created
  password: 'admin',     // Your password
  port: 5433,                    // Default PostgreSQL port
});

export default pool;