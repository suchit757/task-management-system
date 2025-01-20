import { FastifyInstance } from 'fastify';
import { TaskModel } from '../models/TaskModel';

export default async function taskRoutes(fastify: FastifyInstance) {

  // API to create a new task
  fastify.post('/tasks', async (request, reply) => {
    try {
      const { userId, title, description } = request.body as { userId: number; title: string; description?: string };
      if (!userId || !title) {
        return reply.status(400).send({ error: 'User ID and title are required' });
      }

      const task = await TaskModel.createTask(userId, title, description);
      return reply.status(201).send(task);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: `Internal Server Error` });
    }
  });

  // API to get a task by ID
  fastify.get('/tasks/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      if (!id) {
        return reply.status(400).send({ error: 'Task ID is required' });
      }

      const task = await TaskModel.getTaskById(Number(id));
      if (!task) {
        return reply.status(404).send({ error: 'Task not found' });
      }

      return reply.send(task);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // API to get all tasks for a user
  fastify.get('/users/:userId/tasks', async (request, reply) => {
    try {
      const { userId } = request.params as { userId: string };
      if (!userId) {
        return reply.status(400).send({ error: 'User ID is required' });
      }

      const tasks = await TaskModel.getTasksByUser(Number(userId));
      return reply.send(tasks);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // API to update a task by ID
  fastify.put('/tasks/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      if (!id) {
        return reply.status(400).send({ error: 'Task ID is required' });
      }

      const updates = request.body as Record<string, any>;
      const task = await TaskModel.updateTask(Number(id), updates);
      if (!task) {
        return reply.status(404).send({ error: 'Task not found' });
      }

      return reply.send(task);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // API to delete a task by ID
  fastify.delete('/tasks/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      if (!id) {
        return reply.status(400).send({ error: 'Task ID is required' });
      }

      const task = await TaskModel.deleteTask(Number(id));
      if (!task) {
        return reply.status(404).send({ error: 'Task not found' });
      }

      return reply.send({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
