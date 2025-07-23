import { get } from "$lib/api";
import type { PageServerLoad } from "../$types";

console.log("page.server.js file is alive");

export const load: PageServerLoad = async ({ locals, cookies }) => {
  console.log("LOCALS : ", locals);
  //   locals.authToken = cookies.get("accessToken");

  console.log("LOCALS after Update : ", cookies.getAll());

  //   const tenantInfo = get("/api/v1/tenants", locals.user);
  return {
    data: ["shashi", "rabi"],
  };
};
