<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { GalleryProps } from "./GalleryRow-types";


    export let imageInfos: GalleryProps;
    export let featuredImgIndex: number;

  function updateFeaturedImage(index: number) {
    featuredImgIndex = index;
    console.log("image selected : ", index);
  }

  const dispatch = createEventDispatcher();

  $: {
    console.log('childValue changed:', featuredImgIndex);
    dispatch('childValueChange', { featuredImgIndex: featuredImgIndex });
  }

  onMount(() => {
    console.log("On child : ", imageInfos);
    console.log("featured : ", featuredImgIndex);
  })

</script>

<div class="grid grid-cols-5 gap-2">
    {#each imageInfos as info, index}
        <img class="h-auto max-w-full rounded-lg cursor-pointer" 
        on:click={e => updateFeaturedImage(index)}
        src={info.src} alt={info.alt}>
    {/each}
    
</div>