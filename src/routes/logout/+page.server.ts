import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const actions: Actions = {
  default: ({ cookies, locals }) => {
    console.log("form actions : ", locals);

    cookies.delete("accessToken", { path: "/" });
    locals.authToken = "";

    redirect(302, "/login");
  },
};

export const load: PageServerLoad = async () => {
  // we only use this endpoint for the api
  // and don't need to see the page
  throw redirect(302, "/");
};
