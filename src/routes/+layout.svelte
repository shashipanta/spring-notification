<script lang="ts">
  import { onMount } from "svelte";
  import { Toaster } from "svelte-french-toast";
  import Toast from "../components/toast/Toast.svelte";

  onMount(() => {
    // Simulate API response
    // Remove this in your actual usage
    // apiResponse.set({ success: true, message: 'Welcome to the app!' });
    // when layout loads, set the user store
    console.log("This is the layout file missing in middle");
  });
</script>

<Toaster />
<div class="h-screen min-w-full">
  <!-- render api message if api response gives decent message -->
  <Toast />
  <!-- <GenericToast prop={apiResponse} /> -->
  <slot />
</div>
