<script lang="ts">
  import { apiResponse } from "$lib/service/ApiService";
  import { onMount } from "svelte";
  import Toast from "../components/toast/Toast.svelte";
  import GenericToast from "../components/toast/GenericToast.svelte";
  import toast, {Toaster} from 'svelte-french-toast'
  
  onMount(() => {
    // Simulate API response
    // Remove this in your actual usage
    // apiResponse.set({ success: true, message: 'Welcome to the app!' });
  });
</script>


<Toaster />
<div class="h-screen min-w-full">
    <!-- render api message if api response gives decent message -->
    <Toast {apiResponse} />
    <GenericToast {apiResponse} />
  
    <slot />
</div>