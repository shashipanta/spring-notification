<script>
  import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
</script>

<div class="mb-4">
  <Breadcrumb aria-label="Default breadcrumb example">
    <BreadcrumbItem href="/api/property" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/api/property/create">Property</BreadcrumbItem>
    <BreadcrumbItem>Flowbite Svelte</BreadcrumbItem>
  </Breadcrumb>
</div>

<slot/>