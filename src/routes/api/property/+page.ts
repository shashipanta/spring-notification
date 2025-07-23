import { PROPERTY } from "$lib/api-routes";
import { fetchData } from "../../../api.js";


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
  let properties = await fetchData(PROPERTY.OWNER);

  console.log("Properties: ", properties);

  return {
    properties: properties != null ? properties : [],
  };
};


