<script lang="ts">
  import type {
    PropertyRegistrationRequest,
    PropertyType,
    FileType,
  } from "$lib/global-types/PropertyTypes";
  import propertyTypeStore from "$lib/custom-stores/property-stores";
  import {
    Label,
    Tooltip,
    Input,
    Button,
    Select,
    Textarea,
    Fileupload,
    Checkbox,
  } from "flowbite-svelte";
  import { TrashBinOutline } from "flowbite-svelte-icons";
  import GenericNumberGroups from "../number/GenericNumberGroups.svelte";
  import { Section } from "flowbite-svelte-blocks";
  import { onMount } from "svelte";
  import { postDataMultipart, requestDataMultipart } from "../../api";
  import { PROPERTY } from "$lib/api-routes";
  import { AxiosHeaders } from "axios";

  export let propertyRequest: PropertyRegistrationRequest;
  export let selectedFiles: FileType[] = [];

  async function handleSubmit() {
    console.log("Your Form : ", propertyRequest);

    //Todo: fetch owner id from spring boot logged In user
    propertyRequest.ownerId = 1;

    // convert into form-data for this scenario

    let propertyRequestFormData = objectToFormData(propertyRequest);

    let axiosMultipartHeader = new AxiosHeaders({
      "Content-Type": "multipart/form-data",
    });
    let multipartHeader = { "Content-Type": "multipart/form-data" };

    // Append files to FormData
    propertyRequest.imageFiles.forEach((fileType, index) => {
      // if new file is added add it to request for files tagged with "remote" source it's already persisted
      if (fileType.source === "local") {
        propertyRequestFormData.append(
          `multipartFiles[${index}]`,
          fileType.file,
        );
      }
    });
    console.log("With Multipart File : ", propertyRequestFormData);

    // remove error generating multipart file
    propertyRequestFormData.delete("multipartFiles");
    console.log("With Multipart File : ", propertyRequestFormData);
    console.log("After deleting Multipart File : ", propertyRequestFormData);

    // conditionally call different API endpoints based on the request type
    // For example, if you have a id then it's an update request
    let response;
    if (propertyRequest.id) {
      // Call update API endpoint
      console.log("Update request for property with ID: ", propertyRequest.id);
      // You can implement the update logic here
      response = await requestDataMultipart(
        "PUT",
        PROPERTY.UPDATE({ id: propertyRequest.id }),
        propertyRequestFormData,
        axiosMultipartHeader,
      );
    } else {
      response = await postDataMultipart(
        PROPERTY.CREATE,
        propertyRequestFormData,
        multipartHeader,
      );
    }

    console.log(response);
  }

  function objectToFormData(obj: AnyObject) {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  }

  let selected: boolean;
  let propertyTypes: PropertyType[];

  // file logic
  // Define the type for a single file
  let fileuploadprops = {
    type: "file",
    id: "imageInput",
    accept: "image/*",
    multiple: "multiple",
  };

  let multipartFiles: File[] = [];

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      selectedFiles = Array.from(files).map((file, index) => ({
        id: index,
        name: file.name,
        thumbnail: URL.createObjectURL(file),
        file: file,
        source: "local", // Indicating that this file is newly uploaded
      }));
      console.log("Files : ", files);
      // for backend
      propertyRequest.multipartFiles = [...files];
    }
    propertyRequest.imageFiles = selectedFiles;
  };

  const removeImage = (fileIndex: number) => {
    selectedFiles = selectedFiles.filter((file) => file.id != fileIndex);
  };

  onMount(() => {
    console.log("Property  Type store : ", $propertyTypeStore);
    propertyTypes = $propertyTypeStore;
  });
</script>

<Section name="crudcreateform">
  <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
    Add a new Property
  </h2>
  <form on:submit={handleSubmit} enctype="multipart/form-data">
    <input type="hidden" name="ownerId" bind:value={propertyRequest.ownerId} />
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <div class="sm:col-span-2">
        <Label for="name" class="mb-2">Property Name</Label>
        <Input
          type="text"
          id="name"
          bind:value={propertyRequest.propertyTitle}
          placeholder="Type property name"
          required
        />
      </div>
      <div class="w-full">
        <Label for="street-name" class="mb-2">Street Name</Label>
        <Input
          type="text"
          id="street-name"
          bind:value={propertyRequest.streetName}
          placeholder="Street Name"
          required
        />
      </div>
      <div class="w-full">
        <Label for="ward-no" class="mb-2">Ward No</Label>
        <Input
          type="number"
          id="ward-no"
          bind:value={propertyRequest.wardNo}
          placeholder="Ward No"
          required
        />
      </div>
      <div class="w-full">
        <Label for="price" class="mb-2">Price</Label>
        <Input
          type="text"
          id="price"
          bind:value={propertyRequest.allocatedPrice}
          placeholder="RS 29999"
          required
        />
      </div>
      <div class="w-full">
        <Label
          >Property Type
          <Select
            class="mt-2"
            items={propertyTypes}
            placeholder="Choose Property Type..."
            bind:value={propertyRequest.propertyType}
            required
          />
        </Label>
      </div>
      <div class="w-full">
        <Label for="rentPrice" class="mb-2">Rental Price</Label>
        <Input
          type="number"
          id="rentPrice"
          bind:value={propertyRequest.pricePerUnit}
          min="5000"
          placeholder="5000"
          required
        />
      </div>
      <div class="sm:col-span-2">
        <Label for="weight" class="mb-2">Additional Info</Label>
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <GenericNumberGroups bind:propertyRequest />
        </div>
      </div>

      <div class="sm:col-span-2">
        <!-- Image files upload -->
        <Label for="imageInput">Select Images:</Label>
        <Fileupload {...fileuploadprops} on:change={handleFileChange} />

        {#if selectedFiles.length > 0}
          <h2>Selected Images:</h2>
          <span
            class="flex gap-2 flex-wrap justify-start p-2 bg-gray-50 text-gray-900 dark:bg-gray-700 cursor-pointer rounded-md"
          >
            {#each selectedFiles as file (file.id)}
              <span
                class="relative m-2 text-center border rounded-lg border-gray-300 dark:border-gray-600"
              >
                <img
                  class="h-20 w-20 rounded-lg"
                  src={file.thumbnail}
                  alt={file.name}
                />
                <Tooltip>{file.name}</Tooltip>
                <TrashBinOutline
                  on:click={() => removeImage(file.id)}
                  class="absolute top-0 right-0 text-red-700  rounded"
                />
              </span>
            {/each}
          </span>
        {/if}
      </div>

      <div class="w-full">
        <Checkbox bind:checked={propertyRequest.occupied}>Occupied</Checkbox>
      </div>
      <div class="sm:col-span-2">
        <Label for="description" class="mb-2">Description</Label>
        <Textarea
          id="description"
          placeholder="Your description here"
          bind:value={propertyRequest.description}
          rows="4"
          name="description"
          required
        />
      </div>
      {#if propertyRequest.id}
        <Button type="submit" class="w-full">Update Property</Button>
      {:else}
        <Button type="submit" class="w-full">Register Property</Button>
      {/if}
    </div>
  </form>
</Section>
