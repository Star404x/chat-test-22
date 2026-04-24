# API Documentation

Base URL: http://localhost:3000

Endpoints

1) GET /
- Description: Basic welcome endpoint
- Response 200
  {
    "message": "ExpressAPI Test 2"
  }

2) GET /health
- Description: Health/status endpoint
- Response 200
  {
    "status": "ok",
    "uptime": 123.45
  }

3) GET /items
- Description: Retrieve list of items (in-memory)
- Response 200
  [
    {
      "id": "1",
      "name": "item name",
      "data": null,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]

4) POST /items
- Description: Create a new item
- Body (application/json):
  {
    "name": "required string",
    "data": "optional"
  }
- Responses:
  - 201 Created
    {
      "id": "2",
      "name": "...",
      "data": null,
      "createdAt": "..."
    }
  - 400 Bad Request
    {
      "error": "name is required"
    }

5) GET /items/:id
- Description: Get item by id
- Responses:
  - 200 OK -> item JSON
  - 404 Not Found -> { "error": "not_found" }

Notes
- This API is intentionally minimal and in-memory to simplify testing and CI demonstration.
- For production, replace in-memory storage with a persistent database and add input validation, authentication, and proper error handling.

Examples (curl)
- Create an item:
  curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name":"test"}'

- List items:
  curl http://localhost:3000/items


Schema summary
- Item:
  - id: string
  - name: string (required)
  - data: any | null
  - createdAt: ISO timestamp string
