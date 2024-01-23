import { PROPERTY } from "$lib/api-routes";
import { fetchData } from "../../../api";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // let data = fetch(PROPERTY).then((x) => x.json());
  let data = await fetchData(PROPERTY);
  console.log(" Property Data : : ", data);
  return { data };
}
