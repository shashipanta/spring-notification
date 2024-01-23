<script>
  import "../../app.pcss";
  import TopNavBar from "../../components/navbar/TopNavBar.svelte";
  import SideNavBar from "../../components/sidenav/SideNavBar.svelte";
  import GreyBody from "../../components/main/GreyBody.svelte";
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