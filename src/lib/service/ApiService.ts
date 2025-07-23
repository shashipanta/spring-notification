// ApiService.ts
import type { GlobalApiResponse } from "$lib/api";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

interface ApiResponse {
  success: boolean;
  message: string;
}

export const apiResponse: Writable<GlobalApiResponse | null> = writable(null);

export function handleApiResponse(response: ApiResponse) {
  apiResponse.set(response);

  setTimeout(() => {
    apiResponse.set(null);
  }, 5000);
}
