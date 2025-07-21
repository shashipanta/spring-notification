import { USER_ACCOUNT } from "$lib/api-routes";

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
  
  fetch(USER_ACCOUNT.REGISTER, {
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
