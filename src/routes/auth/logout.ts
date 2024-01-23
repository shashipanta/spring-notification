// src/routes/api/logout.js
export async function revokeSession() {
  console.log("insiede revoke session");

  // Perform server-side logout logic (clear session, etc.)
  // ...

  // Clear the HTTP-only cookie by setting it to expire immediately
  return {
    status: 200,
    headers: {
      "Set-Cookie":
        "accessToken=; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/localhost;",
    },
    body: JSON.stringify({ message: "Logout successful" }),
  };
}
