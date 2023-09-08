# Expense Tracker

## Run the app

Get the IP address of the postgres container

```bash
docker inspect 93350be904b0 -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
```

```bash
docker compose up
```

```bash
source .env
```

To start the development app

```bash
npm run dev
```
