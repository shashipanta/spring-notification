import { PUBLIC_SERVER_BASE_URL } from "$env/static/public";
import type { GlobalApiResponse } from "$lib/api";
import toast from "svelte-french-toast";
import axios, { AxiosRequestHeaders, Method } from "axios";
import type { Load } from "@sveltejs/kit";
import type { Cookies } from "@sveltejs/kit";
import { API_PREFIX, BASE_URL } from "$lib/api-routes";

let cookie: Cookies;
let authToken = "authToken";

const api = axios.create({
  baseURL: PUBLIC_SERVER_BASE_URL,
  withCredentials: true,
});


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

export async function requestDataMultipart<T extends { message?: string } = any>(
  method: Method,
  endpoint: string,
  data: any,
  headers?: AxiosRequestHeaders
): Promise<T> {
  try {
    console.log(`HTTP ${method} to ${endpoint} with data:`, data);

    const response = await axios.request<T>({
      url: endpoint,
      method,
      data,
      headers,
      withCredentials: true,
    });

    toast.success((response.data as { message?: string })?.message || 'Operation successful');

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || 'Something went wrong';

    toast.error(errorMessage);

    throw error;
  }
}

