/**
 * This file contains type information required for dynamic route handling in a TypeScript application.
 * It defines utility types and functions to extract route parameters and build URLs dynamically.
 */


/**
 * Extracts all dynamic route parameters from a template string like:
 * "/users/:id/edit/:tab?" -> "id" | "tab"
 * 
 * Supports params like :param, :param?, or :{param} and :{param}?
 */
export type ExtractRouteParams<T extends string> =
    T extends `${string}:{${infer Param}}/${infer Rest}`
    ? Param extends `${infer Name}?`
    ? Name | ExtractRouteParams<`/${Rest}`>
    : Param | ExtractRouteParams<`/${Rest}`>
    : T extends `${string}:{${infer Param}}`
    ? Param extends `${infer Name}?`
    ? Name
    : Param
    : never;

/**
 * Extracts only the optional route parameters (ending in `?`) from a path.
 * "/users/:id/:tab?" -> "tab"
 */
type OptionalParams<T extends string> =
    T extends `${string}:${infer Param}/${infer Rest}`
    ? Param extends `${infer Name}?`
    ? Name | OptionalParams<`/${Rest}`>
    : OptionalParams<`/${Rest}`>
    : T extends `${string}:${infer Param}`
    ? Param extends `${infer Name}?`
    ? Name
    : never
    : never;

/**
 * Extracts only required parameters from a route path by excluding optional ones.
 */
type RequiredParams<T extends string> = Exclude<ExtractRouteParams<T>, OptionalParams<T>>;

/**
 * Builds a type-safe parameter input object for a route:
 * - Required params are mandatory
 * - Optional params are optional
 */
type ParamInput<T extends string> =
    [RequiredParams<T>] extends [never]
    ? { [K in ExtractRouteParams<T>]?: string | number }
    : { [K in RequiredParams<T>]: string | number } & { [K in OptionalParams<T>]?: string | number };

/**
 * Optional query parameters to be appended as a query string.
 */
interface RouteBuilderOptions {
    query?: Record<string, string | number | undefined>;
}

/**
 * ✅ Type-safe route builder function
 *
 * Supports:
 * - Required and optional path parameters (e.g., /users/:id/:tab?)
 * - Automatic URL encoding
 * - Optional query string parameters
 *
 * Example usage:
 * ```ts
 * const getUserRoute = routeBuilder("/users/:{id}");
 * const url = getUserRoute({ id: 42 }, { query: { page: 2, filter: "active" } });
 * // "/users/42?page=2&filter=active"
 * ```
 *
 * @param template - The route path template with dynamic segments (e.g., "/users/:{id}/:tab?")
 * @returns A function that accepts `params` and `options` to generate a full URL
 */
export function routeBuilder<T extends string>(template: T) {
    return (
        params: ParamInput<T>,
        options?: RouteBuilderOptions
    ): string => {
        let path: string = template;

        // Replace path parameters like :id or :slug?
        path = path.replace(/:\{([a-zA-Z0-9_]+)\}\??/g, (_, key: string) => {
            const value = params[key as keyof typeof params];
            if (value == null) {
                if (/:.*\?\}/.test(_)) { // if optional param (tricky to check)
                    return ''; // replace optional param with empty string if missing
                } else {
                    throw new Error(`Missing required route parameter: ${key}`);
                }
            }
            return encodeURIComponent(String(value));
        });

        // Append query parameters if provided
        if (options?.query) {
            const queryString = Object.entries(options.query)
                .filter(([_, v]) => v != null)
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
                .join("&");

            if (queryString) {
                path += `?${queryString}`;
            }
        }

        return path;
    };
}
