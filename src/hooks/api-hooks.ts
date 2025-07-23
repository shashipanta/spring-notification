import type { HttpMethod } from "@sveltejs/kit";

const HTTP_METHOD = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  OPTIONS: "OPTIONS",
  DELETE: "DELETE",
};

export const GET_REQ = async (uri: string) => {
  let data = await fetch(uri, {
    method: "GET",
  })
    .then((res) => {
      console.log("Result of operation : " + uri + " GET ");
      return res;
    })
    .catch((err) => {
      return err;
    });
};

function addHeaders(): string {
  return "";
}
