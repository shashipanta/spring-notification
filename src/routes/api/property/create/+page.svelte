<script lang="ts">
  import { UserCircleSolid } from 'flowbite-svelte-icons';
  import { Label, Select, Input, InputAddon, ButtonGroup, Helper } from 'flowbite-svelte';
  import { Search, Button } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { PROPERTY } from '$lib/api-routes.js';
  import { fetchData, postData } from '../../../../api.js';
  import GenericModal from '../../../../components/Modal/GenericModal.svelte';
  import { Checkbox } from 'flowbite-svelte';
  import NumberGroups from '../../../../components/number/NumberGroups.svelte';
  import CreatePropertyForm from '../../../../components/property/SideBarForm.svelte';
  import PropertyRegistration from '../../../../components/property/PropertyRegistration.svelte';
  import GenericNumberGroups from '../../../../components/number/GenericNumberGroups.svelte';
  import propertyTypeStore from '$lib/custom-stores/property-stores.js';
  import type { PropertyRegistrationRequest } from '$lib/global-types/PropertyTypes.js';
  import type { AxiosHeaders } from 'axios';


  let selected;
 

    let propertyType = [
      { value: 0, name: 'United States' },
      { value: 1, name: 'Canada' },
      { value: 2, name: 'France' }
    ]
    let requiredarr = [
      { value: 'us', name: 'United States' },
      { value: 'ca', name: 'Canada' },
      { value: 'fr', name: 'France' }
    ];
    console.log("required " , propertyType)
    let propertyTypeList : PropertyTypeSelect[] = [];

    interface PropertyTypeSelect {
      value: string,
      name: string
    }
    let propertyTypeObj: PropertyTypeSelect = {
      value: '',
      name: '',
    }
    onMount(async() => {
      const propertyData = fetchData(PROPERTY);
      propertyTypeList = $propertyTypeStore;
    })

    let propertyRequest: PropertyRegistrationRequest = {
      id: "", 
      title: null,
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

    console.log("owner responses : ", ownerResponses);
  </script>
  <!-- <GenericModal /> -->

<!-- <pre>
  {JSON.stringify(data.propertyMetaInfo.data.ownerResponses, null, 2)}
</pre> -->

  
  <!--Create Property side form  -->
  <PropertyRegistration bind:propertyRequest={propertyRequest} />
  