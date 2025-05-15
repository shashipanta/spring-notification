import { LayoutServerLoad } from "../$types";

export const actions = {
  logout: async ({ cookies, locals }) => {
    console.log("Logout action triggered : ", cookies.getAll(), " ", locals);
    cookies.delete("accessToken", { path: "/" });
    locals.user = null;
  },
};

export const load: LayoutServerLoad = async ({ locals }) => {
  console.log("Load function in +page.server.ts /api/+page.server.ts: ", locals.user);
  return {
    user: locals.user
  };
};