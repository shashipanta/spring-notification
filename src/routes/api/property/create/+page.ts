import { PROPERTY } from "$lib/api-routes";
import {
  createPropertyTypeStore,
} from "$lib/custom-stores/property-stores.js";
import { error } from "@sveltejs/kit";
import { fetchData } from "../../../../api.js";
import { P } from "flowbite-svelte";

interface PropertyTypeSelect {
  value: string;
  name: string;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
  let propertyTypeList: [string];
  console.log("PROPERTY.OWNER", PROPERTY.OWNER)
  const propertyMetaInfo = await fetchData(PROPERTY.BASE + "/get-info");

  // get property Type form meta info response
  propertyTypeList = propertyMetaInfo.propertyType;

  // update store
  let ptStore = createPropertyTypeStore();

  console.log("PropertyType", propertyTypeList);

  ptStore.setPropertyType(propertyTypeList);

  // get property id from url if present

  if (url.searchParams.has("id")) {
    const propertyId = url.searchParams.get("id");
    if (propertyId) {
      // fetch property data using the property id
      console.log("THIS IS ID  ==> :", propertyId);
      const url = PROPERTY.VIEW({ id: propertyId });
      const propertyData = await fetchData(url);
      return { propertyMetaInfo, propertyData };
    }
  }

  return { propertyMetaInfo };

  throw error(404, "Not found");
}
