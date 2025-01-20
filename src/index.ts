import Fastify from 'fastify';
import pool from './db'; // Import the database connection pool
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const server = Fastify();

// Middleware: Attach the pool to the Fastify instance
server.decorate('pg', pool);

// Test the database connection with a route
server.get('/', async (request, reply) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()'); // Example query
    reply.send({ success: true, message: 'Database connection successful', data: result.rows[0] });
  } catch (err) {
    console.error('Database query failed:', err);
    reply.status(500).send({ success: false, message: 'Database connection failed', error: err });
  }
});

// Register routes
server.register(userRoutes);
server.register(taskRoutes);

// Start the server
server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
