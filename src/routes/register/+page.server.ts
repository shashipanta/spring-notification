import type { Actions } from "./$types";
import { z } from "zod";
import { validationMessages } from "$lib/constants/ValidationMessages";
import { postData } from "../../api";
import { API_USER_ACCOUNT_AUTH } from "$lib/api-routes";
import { redirect } from "@sveltejs/kit";

console.log("+page.server.ts reloaded!");

const registrationSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: validationMessages.invalidType,
    })
    .min(5, { message: "Username must be atleast 5 characters Long" })
    .max(150, { message: "Username cannot be greater than 150 characters" })
    .trim(),
  password: z
    .string({
      required_error: "Password must be provided.",
    })
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(100, { message: "Password cannot be more than 100 characters long" })
    .trim(),
  email: z
    .string({
      required_error: validationMessages.required,
    })
    .email(),
});

export const actions = {
  create: async ({ request }) => {
    // console.log("request body : ", await request.formData());

    const formData = Object.fromEntries(await request.formData());
    console.log("FORM DATA : ", formData);

    try {
      registrationSchema.parse(formData);
      console.log("successfull person");
    } catch (error: any) {
      console.log("Flatten error    : ", error.flatten());

      const { fieldErrors: errors } = error.flatten();
      const { password, confirmPassword, ...rest } = formData;

      return {
        data: rest,
        errors,
      };
    }

    // api to save user
    let data = await postData(API_USER_ACCOUNT_AUTH + "register", formData, {});

    if (data != null) {
      throw redirect(302, "/login");
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  },

  logout: async ({ cookies, locals }) => {
    console.log("Logout action triggered : ", cookies.getAll(), " ", locals);
    cookies.delete("accessToken", { path: "/" });
    locals.user = null;
  },
} satisfies Actions;
