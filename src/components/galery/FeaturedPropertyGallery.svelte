<script lang="ts">
  import { Gallery } from "flowbite-svelte";
  import { onMount } from "svelte";
  import GalleryRow from "./GalleryRow.svelte";

  import type {
    GalleryProp,
    FeaturedImage,
    SecondaryImage,
  } from "./Gallery-types";

  // export with let to allow parent component to pass data
  export let featuredGalleryProp: GalleryProp;

  let featuredImgIndex = 0;
  let featuredImg: FeaturedImage = {
    alt: "watch",
    src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    isPrimary: true,
  };

  let secondaryImages: SecondaryImage[];
  secondaryImages = [
    {
      alt: "shoes",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    },
    {
      alt: "small bag",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    },
    {
      alt: "plants",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    },
    {
      alt: "shoe",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    },
    {
      alt: "newImg",
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
    },
  ];

  onMount(() => {
    console.log("First : ", secondaryImages);
    console.log("Props passed from parent: ", featuredGalleryProp);
    if (featuredGalleryProp != undefined || featuredGalleryProp != null) {
      console.info("featuredGalleryProp is neither undefined nor null");
      featuredImg = featuredGalleryProp.featuredImage;
      secondaryImages = featuredGalleryProp.secondaryImages;
      console.log("Featured Image : ", featuredImg);
      console.log("Secondary Images : ", secondaryImages);
    }
  });

  /**
   * Updates the featured image by swapping it with the secondary image at the given index.
   *
   * @param {number} index - The index of the secondary image to swap with the featured image.
   *
   * This function replaces the secondary image at the specified index with the current featured image,
   * then sets the featured image to the selected secondary image.
   * It also logs the images before and after the swap for debugging.
   */
  function updateFeaturedImg(index: number) {
    const newFeaturedImage = secondaryImages[index];
    const updatedSecondaryImages = [...secondaryImages];
    updatedSecondaryImages[index] = featuredImg;
    featuredImg = newFeaturedImage;
    secondaryImages = updatedSecondaryImages;
  }
</script>

<Gallery class="grid gap-4">
  <!-- Featured Image / Selected Image -->
  <img
    src={featuredImg.src}
    alt={featuredImg.alt}
    class="w-full h-[400px] object-cover rounded-lg"
  />
  <GalleryRow
    imageInfos={secondaryImages}
    bind:featuredImgIndex
    on:childValueChange={() => updateFeaturedImg(featuredImgIndex)}
  />
</Gallery>
