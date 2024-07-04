import pg from 'pg';

import { dbConfig } from '../configs/dbConfig.js';

class DBService {
  constructor({ host, user, password, database }) {
    this.dbInstance = new pg.Pool({
      host: host,
      user: user,
      password: password,
      database: database,
    });
  }

  async query(query) {
    const client = await this.dbInstance.connect();
    try {
      const result = await client.query(query);
      if (result.rows && result.rows.length > 0) {
        return result.rows;
      }
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  checkConnection() {
    let client;
    this.dbInstance
      .connect()
      .then((connectedClient) => {
        client = connectedClient;
        console.log('Connected to PostgreSQL');
      })
      .catch((err) => {
        console.error('Error connecting to PostgreSQL:', err.message);
      })
      .finally(() => {
        if (client) {
          client.release();
        }
      });
  }
}

const dbService = new DBService(dbConfig);
export default dbService;
