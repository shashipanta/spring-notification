<script lang="ts">
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  // page.ts
  export let data;

  // onMount(fetchTenantInfo);


  async function fetchTenantInfo() {
    // let apiResponse = await fetch(`http://localhost:8090/api/v1/tenants`);
    // let jsonResponse = await apiResponse.json();

    // tenants = jsonResponse.data;

  }

  let tenants = data;


  console.log("locals : ", data)
</script>

<h1>Current Tenants</h1>

<Table hoverable={true}>
  <TableHead>
    <TableHeadCell>Tenant Name</TableHeadCell>
    <TableHeadCell>Phone No</TableHeadCell>
    <TableHeadCell>Net Worth</TableHeadCell>
    <TableHeadCell>Total Rent</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only">Edit</span>
    </TableHeadCell>
  </TableHead>
  <TableBody class="divide-y">
    {#if tenants.length > 0}
      {#each tenants as tenant}
      <TableBodyRow>
        <TableBodyCell hidden>{tenant?.id}</TableBodyCell>
        <TableBodyCell >{tenant?.name}</TableBodyCell>
        <TableBodyCell >{tenant?.phoneNo}</TableBodyCell>
        <TableBodyCell >{tenant?.netWorth}</TableBodyCell>
        <TableBodyCell >{tenant?.occupation}</TableBodyCell>
        <TableBodyCell>
          <a href={`/api/owners/tenants/${tenant?.id}/view`} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
        </TableBodyCell>
      </TableBodyRow>
      {/each}
    {/if}
  </TableBody>
</Table>