# Functional Requirements

## API

- Must serve traffic/requests securely i.e. HTTPS
- Must log user activity i.e. logins, server, database

## Logs

- Must be stored in an external service

## User

- Must authenticate to view or manage financial data
- Must have separate user roles i.e. admin, user, demo
  - Admin role must be able to create, edit, and delete financial data
  - Demo role must be read-only
- Must not be able to connect to the database

## Transactions

- Must be able to upload financial statements
- Must contain the merchant, amount, and date

## Categories

- Must be able to create, edit, and delete budget categories
- Must have a title

## Accounts

- Must be able to create, edit, and delete accounts
- Must be able to link an account to a transaction
