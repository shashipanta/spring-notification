<script lang="ts">
  import { onMount } from "svelte";
  
  import PropertyRegistration from "../../../../components/property/PropertyRegistration.svelte";

  import propertyTypeStore from "$lib/custom-stores/property-stores.js";
  import type { PropertyRegistrationRequest } from "$lib/global-types/PropertyTypes.js";


  let propertyType = [
    { value: 0, name: "United States" },
    { value: 1, name: "Canada" },
    { value: 2, name: "France" },
  ];
  let requiredarr = [
    { value: "us", name: "United States" },
    { value: "ca", name: "Canada" },
    { value: "fr", name: "France" },
  ];
  console.log("required ", propertyType);
  let propertyTypeList: PropertyTypeSelect[] = [];

  interface PropertyTypeSelect {
    value: string;
    name: string;
  }

  onMount(async () => {
    // const propertyData = fetchData(PROPERTY);
    propertyTypeList = $propertyTypeStore;
  });

  let propertyRequest: PropertyRegistrationRequest = {
    id: "",
    propertyTitle: null,
    propertyType: null,
    allocatedPrice: null,
    pricePerUnit: null,
    occupied: false,
    totalRooms: 0,
    addressType: "P",
    wardNo: null,
    streetName: "",
    streetNameNp: "",
    googleLocation: null,
    totalBathRooms: null,
    totalBedRooms: null,
    totalLivingRooms: null,
    totalExternalBathRooms: null,
    imageFiles: [],
    multipartFiles: [],
    ownerId: null,
    description: null,
  };

  export let data;
  console.log("Data sent form server : ", data);
  let ownerResponses = data.propertyMetaInfo.ownerResponses;
  
  // populate propertyRequest with existing data if it is for edit case
  if (data.propertyData != null) {
    console.log("Property Data sent from server : ", data.propertyData);
    propertyRequest = data.propertyData;
  }

  console.log("owner responses : ", ownerResponses);
</script>

<!--Create Property side form  -->
<PropertyRegistration bind:propertyRequest />
