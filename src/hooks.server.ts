import { redirect, type Handle } from "@sveltejs/kit";
import { PUBLIC_SERVER_BASE_URL } from "$env/static/public";
import { request } from "http";
import { handleLoginRedirect } from "$lib/utils/routeUtils";

export const handle: Handle = async ({ resolve, event }) => {
  console.log("Event ", event.cookies.getAll());

  let accessTokenCookie = event.cookies.get("accessToken");

  if (accessTokenCookie != null) {
    event.request.headers.set("Authorization", `Bearer ${accessTokenCookie}`);
  }

  // TODO: access based on roles

  // const fromUrl = event.url.pathname + event.url.search;

  // // if no access token then redirect to login page
  if (event.url.pathname.startsWith("/api") && accessTokenCookie == null)
    throw redirect(303, handleLoginRedirect(event));

  console.log("Hook is hooked!");

  console.log(
    "Authorization Header from h.s.ts : ",
    event.request.headers.get("Authorization")
  );

  const response = await resolve(event);

  console.log(
    "HEADER AFTER RESOLVE : ",
    event.request.headers.get("Authorization")
  );

  return response;
};

function getUserRoles(accessToken: string) {}

// export const handleFetch = async ({ event, request, fetch }) => {
//   console.log("Handle Fetch : ");
//   if (request.url.startsWith("http://localhost:8090/api/v1")) {
//     const authToken = event.cookies.get("accessToken");
//     console.log("Access Token : ", authToken);
//     request.headers.set("Authorization", `Bearer ${authToken}`);
//     // Perform the actual fetch with the modified request
//     const response = await fetch(request);

//     // Process the response if needed

//     return response;
//   }

//   return fetch(request);
// };
