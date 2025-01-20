import pool from '../db';

export class UserModel {

  // Inserts a new user into the database and returns the created user
  static async createUser(name: string, email: string) {
    const query = `
      INSERT INTO users (name, email)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, email]);
    return rows[0];
  }

  // Fetches a user from the database by ID
  static async getUserById(id: number) {
    const query = 'SELECT * FROM users WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Fetches all users from the database
  static async getAllUsers() {
    const query = 'SELECT * FROM users;';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Deletes a user from the database by ID and returns the deleted user
  static async deleteUser(id: number) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}
