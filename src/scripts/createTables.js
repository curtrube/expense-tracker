import dbService from '../services/dbService.js';

const createDatabase = async () => {
  const sql = 'CREATE DATABASE expense_tracker;';
  // TODO: dbService assumes expense_tracker exists
  console.log(await dbService.query(sql));
};

const createCategoryTable = async () => {
  const sql = `
      CREATE TABLE IF NOT EXISTS public.categories (
          category_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
          name text COLLATE pg_catalog."default" NOT NULL,
          description text,
          CONSTRAINT categories_pkey PRIMARY KEY (category_id)
      );
  `;
  console.log('creating categories table');
  console.log(await dbService.query(sql));
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
  console.log('creating accounts table');
  console.log(await dbService.query(sql));
};

const createTransactionsTable = async () => {
  const sql = `
      CREATE TABLE IF NOT EXISTS public.transactions (
          transaction_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
          merchant text COLLATE pg_catalog."default" NOT NULL,
          amount double precision NOT NULL,
          date date NOT NULL,
          user_id uuid NOT NULL,
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
            ON DELETE NO ACTION,
        CONSTRAINT user_id FOREIGN KEY (user_id)
            REFERENCES public.users (user_id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
      );
  `;
  console.log('creating transactions table');
  console.log(await dbService.query(sql));
};

const createUsersTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS public.users (
        user_id uuid DEFAULT gen_random_uuid() not null UNIQUE, 
        username text not null UNIQUE, 
        password text not null, 
        refresh_token text,
      CONSTRAINT users_pkey PRIMARY KEY (user_id)
    );
  `;
  console.log('creating users table');
  console.log(await dbService.query(sql));
};

await createDatabase();
await createCategoryTable();
await createAccountsTable();
await createUsersTable();
await createTransactionsTable();
