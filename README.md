# Minimal Project

A minimal Node.js application scaffold with Docker support.

Usage
-----

Local
-----

1. Install (no dependencies required for the basic example, but run to be safe):

   npm install

2. Start the app:

   npm start

3. Open http://localhost:3000

Docker
------

1. Build the image:

   docker build -t minimal-project .

2. Run the container (map port 3000):

   docker run -p 3000:3000 --name minimal-project minimal-project

3. Optionally override the port:

   docker run -p 4000:4000 -e PORT=4000 minimal-project

What you'll see
----------------

The app responds with a small JSON payload, e.g.:

{
  "message": "Hello from Minimal Project",
  "path": "/"
}

Next steps
----------

- Implement application endpoints and business logic in src/
- Add tests and linting
- Add CI configuration
