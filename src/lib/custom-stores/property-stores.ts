import { writable, type Writable } from "svelte/store";
import type {
  PropertyRegistrationRequest,
  PropertyType,
  PropertyTypeList,
} from "$lib/global-types/PropertyTypes";

const propertyRequest: PropertyRegistrationRequest = {
  id: null,
  title: null,
  propertyType: null,
  allocatedPrice: null,
  pricePerUnit: null,
  totalRooms: null,
  occupied: "",
  imageFiles: null,
  roomNumberInfo: {
    totalBathRooms: null,
    totalBedRooms: null,
    totalLivingRooms: null,
    totalExternalBathRooms: null,
  },
  ownerId: null,
  propertyAddress: {
    addressType: null,
    wardNo: null,
    googleLocation: null,
    streetName: null,
    streetNameNp: null,
  },
  description: null,
};

const propertyTypeStore: Writable<PropertyType[]> = writable([]);
const propertyRegRequest: Writable<PropertyRegistrationRequest> =
  writable(propertyRequest);

export function createPropertyTypeStore() {
  function getPropertyType() {
    return propertyTypeStore;
  }

  function setPropertyType(propertyTypeArr: string[]) {
    // populate field
    let propertyTypeList: PropertyType[] = [];
    propertyTypeArr.forEach((propertyType, index) => {
      let pt: PropertyType = {
        value: propertyType,
        name: propertyType,
      };
      propertyTypeList.push(pt);
    });

    // update the store
    propertyTypeStore.set(propertyTypeList);
  }

  return {
    ...propertyTypeStore,
    getPropertyType,
    setPropertyType,
  };
}

export default propertyTypeStore;

export function createPropertyRegistrationStore() {
  function updatePropertyReq(propRegReq: PropertyRegistrationRequest) {}
}
