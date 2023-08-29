# Expense Tracker

## Tasks

1. Create the github repo ✅
1. Get postgresql running in a container ✅
1. Get pgadmin running in a container ✅
1. Create docker-compose to start both psql and pgadmin ✅
1. Boostrap the Express backend ✅
1. Create the /accounts api endpoint

## Run the app

```bash
docker compose up
```

Get the IP address of the postgres container

```bash
docker inspect 93350be904b0 -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
```
