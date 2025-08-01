import { PUBLIC_SERVER_BASE_URL } from "$env/static/public";
import type { GlobalApiResponse } from "$lib/api";
import axios, { AxiosRequestHeaders, Method } from "axios";
import toast from "svelte-french-toast";

/**
 * This file contains functions to interact with the API.
 * It includes functions to fetch data, post data, and handle multipart requests.
 * The API base URL is defined in the environment variables.
 */
const api = axios.create({
  baseURL: PUBLIC_SERVER_BASE_URL,
  withCredentials: true,
});


/**
 * @deprecated
 * This function fetches data from a given API endpoint.
 * It uses the axios to make a GET request (default) to the specified endpoint,
 * and returns the data in JSON format.
 * @param endpoint The API endpoint to fetch data from.
 * @returns A promise that resolves to the data fetched from the API.
 * @throws An error if the fetch operation fails.
 */
export async function fetchData(endpoint: string) {
  const apiEndPoint = endpoint;
  try {
    console.log("Fetching Data : ", apiEndPoint);
    // console.log("Request Body : ", fetch(endpoint));
    const response = await fetch(apiEndPoint, {
      credentials: "include",
    });
    const responseJson: GlobalApiResponse = await response.json();

    // console.log("Data fetched from server : (json) : ", responseJson);
    console.log("Main Data inside : ", responseJson.data);

    return responseJson.data;
  } catch (error) {
    throw error;
  }
}

/**
 * This function sends a request to the API with the specified method and data.
 * It uses axios to make the request and handles the response.
 * If the request is successful, it returns the response data.
 * If the request fails, it throws an error and displays a toast notification with the error message.
 *
 * @param endpoint The API endpoint to send the request to.
 * @param method HTTP method to use for the request (default is 'GET').
 * @param data data to be sent in the request body (if applicable). either JSON or FormData.
 * @param headers Optional headers to include in the request.
 * @returns promise that resolves to the response data.
 * @throws An error if the request fails, with a toast notification displaying the error message.
 */
export async function requestData<T extends { message?: string } = any>(
  endpoint: string,
  method: Method = 'GET',
  data?: any,
  headers?: AxiosRequestHeaders
): Promise<T> {
  try {
    console.log(`HTTP ${method} to ${endpoint} with data:`, data);

    const response = await api.request<T>({
      url: endpoint,
      method,
      data: method !== 'GET' ? data : undefined,
      headers,
    });

    if (response.data?.message) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || 'Something went wrong';

    toast.error(errorMessage);
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
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error);
    } else {
      console.error("Unexpected error:", error);
    }
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    
    throw error;
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

