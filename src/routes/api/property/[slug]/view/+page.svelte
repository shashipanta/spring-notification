<script lang="ts">
	import { buildApiRoute, PROPERTY } from "$lib/api-routes";
	import { Skeleton } from "flowbite-svelte";
	import { onMount } from "svelte";
	import FeaturedPropertyGallery from "../../../../../components/galery/FeaturedPropertyGallery.svelte";

	export let data; // the input data containing propertyId

	let propertyId = data.propertyId;
	const url = buildApiRoute(PROPERTY.GET_INFO, { id: propertyId });

	let promise: Promise<any> = Promise.resolve(null); // initialized to resolved Promise to avoid undefined errors

	onMount(() => {
		promise = fetch(url, { credentials: "include" }).then((res) => res.json());
	});

	interface GalleryProp {
		featuredImage: { alt: string; src: string };
		secondaryImages: { alt: string; src: string }[];
	}

	function transformToGalleryProp(rawData: any): GalleryProp {
  	const baseUrl = 'http://localhost:8090/api/v1/properties/get-image/';

  	console.log("Raw data received:", rawData);

  return {
    featuredImage: {
      alt: rawData?.featuredImage?.altText || "No alt text",
      src: rawData?.featuredImage?.fileName ? baseUrl + rawData.featuredImage.fileName : "",
    },
    secondaryImages: Array.isArray(rawData?.secondaryImages)
      ? rawData.secondaryImages.map((img: any) => ({
          alt: img?.altText || "No alt text",
          src: img?.fileName ? baseUrl + img.fileName : "",
        }))
      : [],
  };
}
</script>

{#await promise}
	<Skeleton size="sm" class="my-8" />
	<Skeleton size="md" class="my-8" />
	<Skeleton size="lg" class="my-8" />
	<Skeleton size="xl" class="my-8" />
	<Skeleton size="xxl" class="mt-8 mb-2.5" />
{:then apiData}  <!-- renamed local variable to apiData -->
	{#if apiData}
		<div class="grid grid-cols-2">
			<FeaturedPropertyGallery featuredGalleryProp={transformToGalleryProp(apiData.data[0])} />
			<pre class="max-h-[600px] overflow-auto text-sm bg-gray-100 p-2 rounded">{JSON.stringify(apiData, null, 2)}</pre>
		</div>
	{:else}
		<p>No data found.</p>
	{/if}
{:catch error}
	<p>Error loading data: {error.message}</p>
{/await}
