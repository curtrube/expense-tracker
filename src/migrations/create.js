import dbService from '../services/dbService.js';

async function up() {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS public.users (
        user_id uuid DEFAULT gen_random_uuid() NOT NULL UNIQUE,
        username text NOT NULL UNIQUE,
        first_name text,
        last_name text,
        password text NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
    );
    `;

  const refreshTokensTable = `
    CREATE TABLE IF NOT EXISTS public.refresh_tokens (
        refresh_token_id uuid DEFAULT gen_random_uuid() NOT NULL UNIQUE,
        refresh_token text,
        user_id uuid NOT NULL,
    CONSTRAINT refresh_tokens_pkey PRIMARY KEY (refresh_token_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    );
    `;

  const categoriesTable = `
    CREATE TABLE IF NOT EXISTS public.categories (
        category_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
        name text NOT NULL,
        description text,
        user_id uuid NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (category_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    );
    `;

  const accountsTable = `
    CREATE TABLE IF NOT EXISTS public.accounts (
        account_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
        number integer NOT NULL,
        name text, 
        institution text,
        user_id uuid NOT NULL,
    CONSTRAINT accounts_pkey PRIMARY KEY (account_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    );
    `;

  const transactionsTable = `
    CREATE TABLE IF NOT EXISTS public.transactions (
        transaction_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
        merchant text NOT NULL,
        amount double precision NOT NULL,
        date date NOT NULL,
        user_id uuid NOT NULL,
        account_id integer NOT NULL,
        category_id integer NOT NULL,
    CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
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

    const tables = [usersTable, refreshTokensTable, categoriesTable, accountsTable, transactionsTable]

    for (const table of tables) {
        console.log(await dbService.query(table))
    }
}

async function down() {
    const tables = ['transactions', 'categories', 'accounts', 'refresh_tokens', 'users']

    for (const table of tables) {
        const sql = `DROP TABLE ${table}`
        console.log(await dbService.query(sql))
    }
} 

await up();
//await down();
