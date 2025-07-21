import { PUBLIC_SERVER_BASE_URL } from "$env/static/public";
import { routeBuilder } from "./utils/typed-routes";

export const BASE_URL = PUBLIC_SERVER_BASE_URL;
export const API_PREFIX = "/api/v1/";

// USER-ACCOUNTS
export const _USER_ACCOUNT = BASE_URL + API_PREFIX + "user-accounts";
export const USER_ACCOUNT = {
    BASE: _USER_ACCOUNT,
    DETAILS: _USER_ACCOUNT + "/details",
    REGISTER: _USER_ACCOUNT + "/auth/register",
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
    OWNER: _PROPERTY + "/owner",

    UPDATE: routeBuilder(`${_PROPERTY }/:{id}`),
    DELETE: _PROPERTY + "/:{id}",
    GET_INFO: routeBuilder(`${_PROPERTY}/get-info/:{id}`),
    VIEW: routeBuilder(`${_PROPERTY}/get/:{id}`),

    // 🧠 Type-safe route builders
    GET_IMAGE: routeBuilder(`${_PROPERTY}/get-image/:{imageFilename}`),
}




