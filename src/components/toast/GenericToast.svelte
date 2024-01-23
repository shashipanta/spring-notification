<script lang="ts">
  import type { GlobalApiResponse } from "$lib/api";
  import { apiResponse } from "$lib/service/ApiService";
    import { Toast } from "flowbite-svelte";
    import { CheckCircleSolid, ExclamationCircleSolid, FireOutline, CloseCircleSolid } from 'flowbite-svelte-icons';

    interface ToastProp {
      status: string,
      message: string
    }

    export let prop: GlobalApiResponse; 

    console.log("Toast prop inside Toast: ", prop);
</script>

{#if $apiResponse}
  <Toast color="red" >
      <svelte:fragment slot="icon">
        <CloseCircleSolid class="w-5 h-5" />
        <span class="sr-only">Error icon</span>
      </svelte:fragment>
      {$apiResponse.message}
  </Toast>

{/if}