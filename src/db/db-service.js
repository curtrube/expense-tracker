import pg from 'pg';

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
      return result.rows;
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
};

export default DBService;
