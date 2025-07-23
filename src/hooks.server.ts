import { USER_ACCOUNT } from "$lib/api-routes";
import { user } from "$lib/custom-stores/UserInfo-store";
import { handleLoginRedirect } from "$lib/utils/routeUtils";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ resolve, event }) => {
  console.log("Event ", event.cookies.getAll());

  let accessTokenCookie = event.cookies.get("accessToken");
  let userInfoCookie = event.cookies.get("userInfo");

  // setting the token info for locals to access
  event.locals.authToken = accessTokenCookie != null ? accessTokenCookie : "";
  event.locals.user = userInfoCookie;

  if (accessTokenCookie != null) {
    event.request.headers.set("Authorization", `Bearer ${accessTokenCookie}`);
  }

  // TODO: access based on roles

  // const fromUrl = event.url.pathname + event.url.search;

  // populate locals with user info if user is logged in 
  if (event.locals.user == null && accessTokenCookie != null) {
    console.info("========== Fetching user info from API ==========");
    const userInfo = await fetch(USER_ACCOUNT.DETAILS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessTokenCookie}`,
        "Content-Type": "application/json",
      },
    });
    if (userInfo.ok) {
      const userInfoData = await userInfo.json();
      console.log("User info data: ", userInfoData);
      const loggedUserInfo = {
        id: userInfoData.data.userAccountId,
        username: userInfoData.data.username,
        email: userInfoData.data.email,
      }
      event.locals.user = loggedUserInfo
      // write user info to store (for client-side access)
      user.set(loggedUserInfo);
      
    }
  }

  console.log("User info from hook: ", event.locals.user);

  console.info("========== HOOK.SERVER.TS is hooked to all routes");

  // // if no access token then redirect to login page
  if (event.url.pathname.startsWith("/api") && accessTokenCookie == null)
    throw redirect(303, handleLoginRedirect(event));


  const response = await resolve(event);

  return response;
};
