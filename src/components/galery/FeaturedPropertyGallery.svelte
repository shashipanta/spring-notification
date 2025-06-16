<script lang="ts">
  import { Gallery } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import GalleryRow from './GalleryRow.svelte';

  interface GalleryProp {
    featuredImage: {
      alt: string;
      src: string;
    };
    secondaryImages: {
      alt: string;
      src: string;
    }[];
  }

 export let featuredGalleryProp: GalleryProp;
  
  

  let featuredImg = {
    alt: 'watch',
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg'
  };

  let featuredImgIndex = 0;

  let secondaryImages = [
    { alt: 'shoes', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg' },
    { alt: 'small bag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg' },
    { alt: 'plants', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg' },
    { alt: 'shoe', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg' },
    { alt: 'newImg', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg' },
  ];

  onMount(() => {
    console.log("First : ", secondaryImages);
    console.log("Props passed from parent: ", featuredGalleryProp);
    if (featuredGalleryProp != undefined || featuredGalleryProp != null) {
      console.error("featuredGalleryProp is undefined or null");
      featuredImg = featuredGalleryProp.featuredImage;
      secondaryImages = featuredGalleryProp.secondaryImages;
      console.log("Featured Image : ", featuredImg);
      console.log("Secondary Images : ", secondaryImages);
    }
  });

  function updateFeaturedImg(index: number) {
    console.log("Secondary Image previously : ", secondaryImages)
    console.log("Image : ", index)
    const imgToReplace : GalleryProps = {
      src : secondaryImages[index],
      alt : secondaryImages[index].alt
    };
    secondaryImages[index] = featuredImg;
    featuredImg = imgToReplace;
    console.log("Secondary Image after : ", secondaryImages);
  }
</script>

<Gallery class="grid gap-2" >
  <img src={featuredImg.src} alt={featuredImg.alt} class="h-auto max-w-full rounded-lg" />
  <GalleryRow imageInfos={secondaryImages} bind:featuredImgIndex={featuredImgIndex}
  on:childValueChange={() => updateFeaturedImg(featuredImgIndex)}/>
</Gallery>
