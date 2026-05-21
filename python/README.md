# AppealFlow FastAPI Backend

## Folder Structure

```text
python/
  p1.py                 # Local dev entrypoint
  app/
    main.py             # FastAPI app, CORS, routers, error handlers
    config.py           # Environment-based settings
    database.py         # SQLite/SQLAlchemy setup
    models.py           # User and chat history tables
    schemas.py          # Request/response validation
    security.py         # Password hashing and JWT helpers
    routers/
      auth.py           # Signup/login endpoints
      chat.py           # Chat and history endpoints
requirements.txt
```

## Setup

```bash
pip install -r requirements.txt
python python/p1.py
```

API docs will be available at `http://127.0.0.1:8000/docs`.

Set `JWT_SECRET_KEY` in production:

```bash
set JWT_SECRET_KEY=your-long-random-secret
```

## Endpoints

- `POST /auth/signup`
- `POST /auth/login`
- `POST /chat`
- `GET /history`
- `GET /health`

Use the login response token as:

```http
Authorization: Bearer <access_token>
```
