# TODO

To track what has been done and what needs to be completed.

## GitHub Repo

- [X] Create the github repo
- [ ] Create some CI (maybe super-linter - https://github.com/super-linter/super-linter)

## Database

- [X] Get postgresql running in a container
- [X] Get pgadmin running in a container
- [X] Create docker-compose to start both psql and pgadmin ✅
- [x] Create table schema
- [x] Create database tables (categories, accounts, transactions)
- [ ] Implement a connection pool

## API

- [X] Boostrap the Express backend
- [x] Connect node/express to postgres
- [ ] Test send some data to a table and retrieve
- [ ] Create the /categories api endpoint
- [ ] Create the /accounts api endpoint
- [ ] Create the /transactions api endpoint
- [ ] Read an API design doc - https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design
- [ ] Implement logging

## Client

- [ ] Basic web page layout
- [ ] Create a categories view
- [ ] Look into NGINX for hosting web page (reverse proxy)

## New - 1/17

- Add 404 route - Done
- Add html templating engine, get rid of several .html files - wait on this, may use something like react instead.
- Consolidate all routes into one file, so we don't have multiple imports in app.js - Done
- Work on View/Front end functionality - Create category modal working


## 1/31

- sort categories alphabetically - Done
- when editing a category 'enter' should submit the form - Done
- when editing auto focus the input - Done
- fix: new category input form not cleared after submitting with 'enter' key - Done
- feat: add a confirm before deleting a category