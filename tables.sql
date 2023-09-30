CREATE TABLE IF NOT EXISTS "expense-tracker".accounts
(
    account_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text COLLATE pg_catalog."default" NOT NULL,
    bank text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT accounts_pkey PRIMARY KEY (account_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "expense-tracker".accounts
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS "expense-tracker".categories
(
    category_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text COLLATE pg_catalog."default",
    CONSTRAINT categories_pkey PRIMARY KEY (category_id),
    CONSTRAINT name_uq UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "expense-tracker".categories
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS "expense-tracker".transactions
(
    transaction_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    merchant text COLLATE pg_catalog."default" NOT NULL,
    amount double precision NOT NULL,
    date date NOT NULL,
    account_id integer NOT NULL,
    category_id integer NOT NULL,
    CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id),
    CONSTRAINT account_id FOREIGN KEY (account_id)
        REFERENCES "expense-tracker".accounts (account_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT category_id FOREIGN KEY (category_id)
        REFERENCES "expense-tracker".categories (category_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "expense-tracker".transactions
    OWNER to postgres;