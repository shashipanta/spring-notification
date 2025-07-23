<script lang="ts">
  import { onMount } from "svelte";

  import PropertyRegistration from "../../../../components/property/PropertyRegistration.svelte";

  import propertyTypeStore from "$lib/custom-stores/property-stores.js";
  import type {
    FileType,
    PropertyRegistrationRequest,
  } from "$lib/global-types/PropertyTypes.js";
  import { PROPERTY } from "$lib/api-routes";

  // this is the data passed from the server
  // it contains propertyMetaInfo and propertyData
  // propertyMetaInfo contains information about property types, owners, etc.
  // propertyData contains the actual data of the property if it is for edit case
  // if it is for create case, propertyData will be null
  export let data;

  let propertyType = [
    { value: 0, name: "United States" },
    { value: 1, name: "Canada" },
    { value: 2, name: "France" },
  ];

  console.log("required ", propertyType);

  let propertyTypeList: PropertyTypeSelect[] = [];
  let selectedFiles: FileType[] = [];

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
      description: null,
      propertyOwnershipRequests: []
  };


  console.log("Data sent form server : ", data);
  let ownerResponses = data.propertyMetaInfo.ownerResponses;

  // populate propertyRequest with existing data if it is for edit case
  if (data.propertyData != null) {
    console.log("Property Data sent from server : ", data.propertyData);
    propertyRequest = data.propertyData;

    // unwrap address information
    if (data.propertyData.addressResponse) {
      const addressResponse = data.propertyData.addressResponse;
      propertyRequest.addressType = addressResponse.addressType;
      propertyRequest.wardNo = addressResponse.wardNo;
      propertyRequest.streetName = addressResponse.streetName;
      propertyRequest.streetNameNp = addressResponse.streetNameNp;
      propertyRequest.googleLocation = addressResponse.googleLocation;
    }

    // to view image files
    propertyRequest.imageFiles = data.propertyData.images.map(
      (fileName: string, index: number) => {
        console.log("Image file name : ", fileName);
        const imageUrl = PROPERTY.GET_IMAGE({ imageFilename: fileName });

        return {
          id: index,
          name: fileName,
          thumbnail: imageUrl,
          file: null, // because it's from the server, not an uploaded File
        };
      },
    );

    selectedFiles = propertyRequest.imageFiles;

    console.log("The server sent request object : ", propertyRequest);
  }

  console.log("owner responses : ", ownerResponses);
</script>

<!--Create Property side form  -->
<PropertyRegistration bind:propertyRequest {selectedFiles} />
