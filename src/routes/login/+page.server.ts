import { API_USER_ACCOUNT_AUTH, USER_ACCOUNT } from "$lib/api-routes.js";
import { redirect } from "@sveltejs/kit";
import { z } from "zod";
import { user } from "$lib/custom-stores/UserInfo-store";

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

    // check if login was successful
    if (!loginRes.ok) {
      const errorData = await loginRes.json();
      console.log("error data", errorData);
      const errorMessage = errorData.message || "Login failed";

      throw redirect(302, `/login?message=${errorMessage}`);
    }

    let loginData = await loginRes.json();
    console.log("login data", loginData);
    const { accessToken, refreshToken } = loginData.data;



    // add to cookies
    cookies.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });


    // update locals to include authentication token: this is available in every load functions
    locals.authToken = accessToken;

    // store token info in user store
    user.set({
      id: loginData.data.userId,
      username: loginData.data.username,
      email: loginData.data.email,
      avatar: loginData.data.avatar,
      accessToken: accessToken,
    });

    console.log("User store updated with login data:", user);

    const redirectTo = url.searchParams.get("redirectTo");

    if (redirectTo) {
      throw redirect(302, `/${redirectTo.slice(1)}`);
    } else {
      throw redirect(302, "/api/dashboard");
    }
  },
};
