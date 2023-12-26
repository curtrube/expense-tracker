import pg from 'pg'

const databaseName = 'expense_tracker'
const schemaName = 'expense_tracker';

async function createDatabase(database) {
    const client = new pg.Client();
    try {
        await client.connect();
        // check if database exists
        const query = `SELECT datname FROM pg_database WHERE datname = '${database}';`
        const result = await client.query(query);
        if (result.rowCount === 0) {
            console.log(`database not found`)
            console.log('creating database')
            await client.query(`CREATE DATABASE "${database}";`)
            console.log('database created')
        } else {
            console.log(`database '${database}' already exists`)
        }
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        await client.end();
    }
}


async function createSchema(schema) {
    const client = new pg.Client({
        database: databaseName
    });
    try {
        await client.connect();
        // check if database schema exists
        const schemaQuery = `SELECT nspname FROM pg_namespace WHERE nspname = '${schema}';`
        const result = await client.query(schemaQuery);
        if (result.rowCount === 0) {
            console.log('schema not found')
            console.log('creating schema')
            await client.query(`CREATE SCHEMA ${schema}`)
            console.log('schema created')
        } else {
            console.log(`schema '${schemaName}' already exists`)
        }
    } catch (error) {
        console.error('Error creating schema:', error);
    } finally {
        await client.end();
    }
}

async function createTable() {
    const client = new pg.Client({
        database: databaseName,
    });
    try {
        await client.connect();
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS "expense_tracker".categories (
                category_id SERIAL PRIMARY KEY,
                name TEXT
            );
        `;
        await client.query(createTableQuery);
        console.log('Table "categories" created successfully.');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        await client.end();
    }
}

await createTable();