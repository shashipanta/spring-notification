import type { Actions } from "@sveltejs/kit";

export const actions = {
  logout: async ({ cookies, locals }) => {
    console.log("Logout action triggered : ", cookies.getAll(), " ", locals);
    cookies.delete("accessToken", { path: "/" });
    // locals.user = null;
  },
} satisfies Actions;
