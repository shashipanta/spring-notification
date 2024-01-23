import { USER_ACCOUNT } from "$lib/api-routes";
import { fetchData } from "../../api";

interface UserAccuntReq {
  username: string;
  password: string;
  email: string;
}

export const accountReq: UserAccuntReq = {
  username: "",
  password: "",
  email: "",
};

export const registerUser = (requestBody: UserAccuntReq) => {
  let user_registration_uri = USER_ACCOUNT;

  fetch(user_registration_uri, {
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

export default { UserAccuntReq: accountReq, fn: registerUser };
