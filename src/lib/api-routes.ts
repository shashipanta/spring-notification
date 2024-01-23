import { PUBLIC_SERVER_BASE_URL } from "$env/static/public";

export const BASE_URL = PUBLIC_SERVER_BASE_URL;
export const API_PREFIX = "/api/v1/";

// OWNER
export const OWNER = BASE_URL + API_PREFIX + "owners/";

// user accounts
export const API_USER_ACCOUNT = BASE_URL + API_PREFIX + "user-accounts";
export const API_USER_ACCOUNT_AUTH = API_USER_ACCOUNT + "/auth/";

// PROPERTY
export const PROPERTY = BASE_URL + API_PREFIX + "properties";
