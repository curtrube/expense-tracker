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

## Test API endpoint with CURL

```
curl -X POST http://127.0.0.1:3000/categories
   -H "Content-Type: application/json"
   -d '{"name":"Test"}'
```
