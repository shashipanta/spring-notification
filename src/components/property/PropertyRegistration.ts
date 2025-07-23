import { PROPERTY } from "$lib/api-routes";

let BASE_URL = PROPERTY;

export const registerUser = (requestBody: any) => {
  let property_uri = BASE_URL;

  fetch(property_uri, {
    method: "post",
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      return response.json;
    })
    .catch((err) => {
      return err;
    });
};
