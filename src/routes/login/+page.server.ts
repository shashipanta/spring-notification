import { z } from "zod";
import { API_USER_ACCOUNT_AUTH } from "$lib/api-routes.js";
import { redirect } from "@sveltejs/kit";

const loginSchema = z.object({
  username: z.string().min(1).max(150).trim(),
  password: z.string().min(1).trim(),
});

export const actions = {
  login: async ({ request, cookies, locals, url }) => {
    const formData = Object.fromEntries(await request.formData());

    // TODO: extract login request
    const loginRes = await fetch(API_USER_ACCOUNT_AUTH + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let loginData = await loginRes.json();
    console.log("login data", loginData);
    const { accessToken, refreshToken } = loginData.data;

    // add to cookies
    cookies.set("accessToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    // update locals to include authentication token: this is available in every load functions
    locals.authToken = refreshToken;

    const redirectTo = url.searchParams.get("redirectTo");

    if (redirectTo) {
      throw redirect(302, `/${redirectTo.slice(1)}`);
    } else {
      throw redirect(302, "/");
    }

    return {
      form: formData,
    };
  },

  logout: async ({ cookies, locals }) => {
    console.log("yoou are getting loggged out just now!");
    console.log("LOCALS IN LOGOUT: ", locals.authToken);
  },
};
