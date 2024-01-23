// src/hooks.ts

export const handle: ServerRequest = async ({ request, resolve }) => {
  // Perform server-side logic before rendering the page
  console.log("Server-side hook executed:", request.url);

  // Call the next server handler in the chain (e.g., the route or another hook)
  const response = await resolve(request);

  // Perform additional tasks after rendering the page
  console.log("Server-side hook completed.");

  return response;
};

// Additional hooks for logout or session revocation
export async function handleRequest({ request, resolve }) {
  const { path } = request;

  // Intercept requests to /api/logout for session revocation
  if (path.startsWith("/logout")) {
    const response = await handle({ request, resolve });

    if (response) {
      // Clear session on the server (e.g., delete session data)
      // Adjust this logic based on your authentication system
      // ...

      // Clear the session cookie by setting it to expire immediately
      response.headers["Set-Cookie"] =
        "session=; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      return response;
    }
  }
}
