# Package.json
## Proxy
When the frontend application is running on port 3000 (typically during development with tools like Create React App), and a request is made to an API endpoint that is not recognized as part of the frontend application itself (i.e., not a relative URL), the "proxy" property allows the request to be proxied or forwarded to another server running on port 4000 (http://localhost:4000 in this case).

This helps avoid CORS issues because the request appears to be originating from the same origin as the frontend application running on port 3000. It acts as a reverse proxy, transparently forwarding the request to the backend server on port 4000.