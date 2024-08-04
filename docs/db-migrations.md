# DB Migrations

Database migrations are managed with [node-pg-migrate]('https://www.npmjs.com/package/node-pg-migrate').

## Usage

To create a new db migration run

```bash
npm run migrate create <migration-name>
```

Execute the migration

```bash
npm run migrate up

npm run migrate down
```
