import { FastifyInstance } from 'fastify';
import { UserModel } from '../models/UserModel';

export default async function userRoutes(fastify: FastifyInstance) {

  // API to create a new user
  fastify.post('/users', async (request, reply) => {
    try {
      const { name, email } = request.body as { name: string; email: string };
      if (!name || !email) {
        return reply.status(400).send({ error: 'Name and email are required' });
      }

      const user = await UserModel.createUser(name, email);
      return reply.status(201).send(user);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // API to get a user by ID
  fastify.get('/users/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      if (!id) {
        return reply.status(400).send({ error: 'User ID is required' });
      }

      const user = await UserModel.getUserById(Number(id));
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      return reply.send(user);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // API to get all users
  fastify.get('/users', async (_request, reply) => {
    try {
      const users = await UserModel.getAllUsers();
      return reply.send(users);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // API to delete a user by ID
  fastify.delete('/users/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      if (!id) {
        return reply.status(400).send({ error: 'User ID is required' });
      }

      const user = await UserModel.deleteUser(Number(id));
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      return reply.send({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
