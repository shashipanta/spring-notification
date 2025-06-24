import { PUBLIC_SERVER_BASE_URL } from "$env/static/public";

export const BASE_URL = PUBLIC_SERVER_BASE_URL;
export const API_PREFIX = "/api/v1/";

// USER-ACCOUNTS
export const _USER_ACCOUNT = BASE_URL + API_PREFIX + "user-accounts/";
export const USER_ACCOUNT = {
    BASE: _USER_ACCOUNT,
    DETAILS: _USER_ACCOUNT + "details",
}

// OWNER
export const OWNER = BASE_URL + API_PREFIX + "owners/";

// user accounts: http://localhost:8090/api/v1/user-accounts/auth/{register, login}
export const API_USER_ACCOUNT = BASE_URL + API_PREFIX + "user-accounts";
export const API_USER_ACCOUNT_AUTH = API_USER_ACCOUNT + "/auth/";

// PROPERTY
export const _PROPERTY = BASE_URL + API_PREFIX + "properties";
export const PROPERTY = {
    BASE: _PROPERTY,
    GET: _PROPERTY ,
    CREATE: _PROPERTY ,
    UPDATE: _PROPERTY + "/:{id}",
    DELETE: _PROPERTY + "/:{id}",
    GET_INFO: _PROPERTY + "/get-info/:{id}",
    VIEW: _PROPERTY + "/get/:{id}",
    OWNER: _PROPERTY + "/owner",
}

// UTILITY FUNCTION TO BUILD URL
export function buildApiRoute<T extends string>(
  route: T, 
  params: Record<string, string>
): string {
  return route.replace(/:{([a-zA-Z]+)}/g, (_, key) => {
    const value = params[key];
    if (!value) throw new Error(`Missing parameter: ${key}`);
    return value;
  });
}

