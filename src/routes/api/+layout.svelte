<script lang="ts">
  import { user } from "$lib/custom-stores/UserInfo-store";
  import "../../app.pcss";
  import TopNavBar from "../../components/navbar/TopNavBar.svelte";
  import SideNavBar from "../../components/sidenav/SideNavBar.svelte";

  export let data;

  console.log("========== /api/+layout.svelte : server-side-data ", data);

  // store the data sent from layout.server.ts into a store
  user.set({
      username: data.user.username,
      email: data.user.email,
      id: data.user.id,
      accessToken: data.user.accessToken,
  });
</script>

<!-- top navigation bar -->
<TopNavBar />

<!-- main-body-container -->
<div class="p-4 sm:ml-64">
  <SideNavBar />
  <div class="mt-14">
    <slot />
  </div>
</div>
