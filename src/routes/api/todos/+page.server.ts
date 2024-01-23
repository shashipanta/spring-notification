import { PROPERTY } from "$lib/api-routes";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  let data = fetch(PROPERTY).then((x) => x.json());
  return { data };
}
