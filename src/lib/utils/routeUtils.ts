import type { RequestEvent } from "../../routes/$types";

export function handleLoginRedirect(
  event: RequestEvent,
  message: string = "You must be logged in to access this resource!"
) {
  const redirectTo = event.url.pathname + event.url.search;
  return `/login?redirectTo=${redirectTo}&message=${message}`;
}
