import { PROPERTY } from "$lib/api-routes";
import { fetchData } from "../../../api";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  let data = null;
  return { data };
}
