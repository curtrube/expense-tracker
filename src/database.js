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

async function createCategoryTable() {
    const client = new pg.Client({
        database: databaseName,
    });
    try {
        await client.connect();
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS public.categories (
                category_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
                name text COLLATE pg_catalog."default" NOT NULL,
                CONSTRAINT categories_pkey PRIMARY KEY (category_id)
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

async function createAccountsTable() {
    const client = new pg.Client({
        database: databaseName,
    });
    try {
        await client.connect();
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS public.accounts (
                account_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
                number integer NOT NULL,
                name text COLLATE pg_catalog."default",
                bank text COLLATE pg_catalog."default" NOT NULL,
                CONSTRAINT accounts_pkey PRIMARY KEY (account_id)
            );
        `;
        await client.query(createTableQuery);
        console.log('Table "accounts" created successfully.');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        await client.end();
    }
}

async function createTransactionsTable() {
    const client = new pg.Client({
        database: databaseName,
    });
    try {
        await client.connect();
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS public.transactions (
                transaction_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
                merchant text COLLATE pg_catalog."default" NOT NULL,
                amount double precision NOT NULL,
                date date NOT NULL,
                account_id integer NOT NULL,
                category_id integer NOT NULL,
                CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id),
                CONSTRAINT account_id FOREIGN KEY (account_id)
                    REFERENCES public.accounts (account_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT category_id FOREIGN KEY (category_id)
                    REFERENCES public.categories (category_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
            );
        `;
        await client.query(createTableQuery);
        console.log('Table "transactions" created successfully.');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        await client.end();
    }
}

await createDatabase(databaseName);
await createCategoryTable();
await createAccountsTable();
await createTransactionsTable();