import { PUBLIC_SERVER_BASE_URL } from "$env/static/public";
import type { GlobalApiResponse } from "$lib/api";
import toast from "svelte-french-toast";
import axios from "axios";
import type { Load } from "@sveltejs/kit";
import type { Cookies } from "@sveltejs/kit";
import { API_PREFIX, BASE_URL } from "$lib/api-routes";

let cookie: Cookies;
let authToken = "authToken";

const api = axios.create({
  baseURL: PUBLIC_SERVER_BASE_URL,
  withCredentials: true,
});

function attachAuthHeader() {
  return {
    Authorization: `Bearer ${authToken}`,
  };
}

export async function fetchData(endpoint: string) {
  const apiEndPoint = endpoint;
  try {
    console.log("Fetching Data : ", apiEndPoint);
    console.log("Authorization header in common fetch function : ");
    // console.log("Request Body : ", fetch(endpoint));
    const response = await fetch(apiEndPoint, {
      credentials: "include",
    });
    const responseJson: GlobalApiResponse = await response.json();

    // console.log("Data fetched from server : (json) : ", responseJson);
    console.log("Main Data inside : ", responseJson.data);

    // const response: GlobalApiResponse = await axios_get(apiEndPoint);
    // handleToast(responseJson.data);

    return responseJson.data;
  } catch (error) {
    throw error;
  }
}


export async function postDataMultipart(
  endpoint: string,
  data: any,
  headers: any
) {
  console.log("header ", headers);
  const apiEndPoint = endpoint;
  try {
    console.log("Data for post: ", data);
    const response: GlobalApiResponse = await api.post(apiEndPoint, data, {
      method: "POST",
    });
    // handleToast(response.data);
    return response.data;
  } catch (error) {
    // if error then it might be wrapped in axios so
    // toast.error(error.response.data.message);
    // handleToast(error.response.data);
    // throw error;
  }
}

function handleToast(response: GlobalApiResponse) {
  console.log("handle toast: ", response);
  if (response === undefined) return;
  let resStatus: string = response?.status.toUpperCase();

  switch (resStatus) {
    case "FAILURE":
      toast.error(response.message);
      break;
    case "SUCCESS":
      console.log("successful person ", response.message);
      toast.success(response.message);
      break;
    default:
      toast.error(response.status);
      break;
  }
}
