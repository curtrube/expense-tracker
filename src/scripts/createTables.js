import dbService from '../services/dbService.js';

const createDatabase = async () => {
  const sql =
    "SELECT datname FROM pg_database WHERE datname = 'expense_tracker';";
  const result = await dbService.query(sql);
  if (result.length === 0) {
    console.log('database not found');
    console.log('creating database');
    await dbService.query('CREATE DATABASE expense_tracker;');
    console.log('database created');
  } else {
    console.log('database already exists');
  }
};

const createCategoryTable = async () => {
  const sql = `
      CREATE TABLE IF NOT EXISTS public.categories (
          category_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
          name text COLLATE pg_catalog."default" NOT NULL,
          CONSTRAINT categories_pkey PRIMARY KEY (category_id)
      );
  `;
  const result = await dbService.query(sql);
  console.log(result);
};

const createAccountsTable = async () => {
  const sql = `
      CREATE TABLE IF NOT EXISTS public.accounts (
          account_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
          number integer NOT NULL,
          name text COLLATE pg_catalog."default",
          bank text COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT accounts_pkey PRIMARY KEY (account_id)
      );
  `;
  const result = dbService.query(sql);
  console.log(result);
};

const createTransactionsTable = async () => {
  const sql = `
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
  const result = await dbService.query(sql);
  console.log(result);
};

const createUsersTable = async () => {
  const sql = `
    CREATE Table public.users(
      user_id uuid DEFAULT gen_random_uuid() not null UNIQUE, 
      username text not null UNIQUE, 
      password text not null, 
      CONSTRAINT users_pkey PRIMARY KEY (user_id)
    );
  `;
  const result = await dbService.query(sql);
  console.log(result);
};

// await createDatabase();
// await createCategoryTable();
// await createAccountsTable();
// await createTransactionsTable();
// await createUsersTable();
