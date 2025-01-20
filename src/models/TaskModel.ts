import pool from '../db';

export class TaskModel {

  // Inserts a new task into the database and returns the created task
  static async createTask(userId: number, title: string, description?: string) {
    const query = `
      INSERT INTO tasks (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [userId, title, description]);
    return rows[0];
  }

  // Fetches a task from the database by ID
  static async getTaskById(id: number) {
    const query = 'SELECT * FROM tasks WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Fetches all tasks assigned to a specific user by user ID
  static async getTasksByUser(userId: number) {
    const query = 'SELECT * FROM tasks WHERE user_id = $1;';
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  // Updates an existing task with new values and returns the updated task
  static async updateTask(id: number, updates: Record<string, any>) {
    const fields = Object.keys(updates)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ');
    const values = [id, ...Object.values(updates)];
    const query = `
      UPDATE tasks
      SET ${fields}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // Deletes a task from the database by ID and returns the deleted task
  static async deleteTask(id: number) {
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}
