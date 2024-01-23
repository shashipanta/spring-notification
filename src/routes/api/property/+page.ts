import { PROPERTY } from "$lib/api-routes";
import { fetchData } from "../../../api.js";

/** @type {import('./$types').PageServerLoad} */
// export async function load({ fetch }) {
//   let data = fetch(PROPERTY);
//   let products = data.then((x) => x.json());
//   console.log("JSON", products);
//   return { products: products.data };
// }

interface GlobalApiResponse {
  message: string;
  data: any;
  status: string;
}

interface PropertyResponse {
  id: Number;
  propertyCode: string;
  propertyType: string;
  allocatedPrice: number;
  isSystemGeneratedPrice: boolean;
}

let properties = [];

export const load = async ({ fetch }) => {
  console.log("Fetthicn Product here");
  let properties = await fetchData(PROPERTY);

  console.log("Properties: ", properties);

  return {
    properties: properties != null ? properties : [],
  };
};
