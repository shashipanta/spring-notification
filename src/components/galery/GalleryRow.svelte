<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { SingleImageProp } from "./Gallery-types";


  export let imageInfos: SingleImageProp[];
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

<div class="grid grid-cols-5 gap-2 place-items-center">
  
  {#each imageInfos as info, index}
    <button
      class="w-[100px] h-[100px] p-0 border-none bg-transparent cursor-pointer overflow-hidden"
      type="button"
      on:click={() => updateFeaturedImage(index)}
      aria-label={`Select image ${info.alt}`}
    >
      <img
        class="w-full h-full object-cover block rounded-lg"
        src={info.src}
        alt={info.alt}
      />
    </button>
  {/each}
</div>
