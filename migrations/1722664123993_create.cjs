/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('users', {
    user_id: { type: 'uuid', notNull: true, unique: true, primaryKey: true },
    username: { type: 'text', notNull: true, unique: true },
    first_name: { type: 'text' },
    last_name: { type: 'text' },
    password: { type: 'text', notNull: true },
  });

  pgm.createTable('refresh_tokens', {
    refresh_token_id: { type: 'uuid', notNull: true, unique: true, primaryKey: true },
    refresh_token: { type: 'text' },
    user_id: { type: 'uuid', references: 'users' },
  });

  pgm.createTable('categories', {
    category_id: { type: 'uuid', notNull: true, unique: true, primaryKey: true },
    name: { type: 'text', notNull: true },
    description: { type: 'text' },
    user_id: { type: 'uuid', references: 'users' },
  });

  pgm.createTable('accounts', {
    account_id: { type: 'uuid', notNull: true, unique: true, primaryKey: true },
    number: { type: 'integer', notNull: true },
    name: { type: 'text', notNull: true },
    type: { type: 'text' },
    institution: { type: 'text' },
    user_id: { type: 'uuid', references: 'users' },
  });

  pgm.createTable('transactions', {
    transaction_id: { type: 'uuid', notNull: true, unique: true, primaryKey: true },
    merchant: { type: 'text', notNull: true },
    amount: { type: 'double precision', notNull: true },
    date: { type: 'date', notNull: true },
    user_id: { type: 'uuid', references: 'users' },
    account_id: { type: 'uuid', references: 'accounts' },
    category_id: { type: 'uuid', references: 'categories' },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('users', { cascade: true });

  pgm.dropTable('refresh_tokens', { cascade: true });

  pgm.dropTable('categories', { cascade: true });

  pgm.dropTable('accounts', { cascade: true });

  pgm.dropTable('transactions', { cascade: true });
};
