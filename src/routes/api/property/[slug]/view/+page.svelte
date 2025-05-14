<script>
	import { onMount } from "svelte";
	import { Gallery, Skeleton } from "flowbite-svelte";
	import FeaturedPropertyGallery from "../../../../../components/galery/FeaturedPropertyGallery.svelte";
	import { buildApiRoute, PROPERTY } from "$lib/api-routes";

	/**
	 * @type {Promise<any>}
	 */
	export let promise;
	export let data;

	let propertyId = data.propertyId;
	console.log("Params slug: ", propertyId);
	const url = buildApiRoute(PROPERTY.GET_INFO, { id: propertyId });
	console.log("URL in page.svelte: ", url);
	onMount(() => {
		promise = fetch(url,{credentials: "include"}).then((x) => x.json());
	});
</script>

{#await promise}
	<!-- optionally show something while promise is pending -->
	<Skeleton size="sm" class="my-8" />
	<Skeleton size="md" class="my-8" />
	<Skeleton size="lg" class="my-8" />
	<Skeleton size="xl" class="my-8" />
	<Skeleton size="xxl" class="mt-8 mb-2.5" />
{:then data}
	<div class="grid grid-cols-2">
		<FeaturedPropertyGallery />
		<pre>{JSON.stringify(data, null, 2)}</pre>
	</div>
	<div class="grid grid-cols-5"></div>
{:catch error}
	<!-- optionally show something while promise was rejected -->
{/await}
