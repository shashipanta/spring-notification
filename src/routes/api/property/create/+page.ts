import { PROPERTY } from "$lib/api-routes";
import { error } from "@sveltejs/kit";
import { fetchData } from "../../../../api.js";
import propertyTypeStore, {
  createPropertyTypeStore,
} from "$lib/custom-stores/property-stores.js";

interface PropertyTypeSelect {
  value: string;
  name: string;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let propertyTypeList: [string];
  const propertyMetaInfo = await fetchData(PROPERTY + "/get-info");

  // get property Type form meta info response
  propertyTypeList = propertyMetaInfo.propertyType;

  // update store
  let ptStore = createPropertyTypeStore();

  console.log("PropertyType", propertyTypeList);

  ptStore.setPropertyType(propertyTypeList);

  return { propertyMetaInfo };

  throw error(404, "Not found");
}
