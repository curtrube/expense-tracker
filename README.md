# Expense Tracker

## Run the app

```bash
docker compose up
```

Get the IP address of the postgres container

```bash
docker inspect 93350be904b0 -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
```
