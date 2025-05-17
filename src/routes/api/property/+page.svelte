<script lang="ts">
  import { Button } from "flowbite-svelte";
  import Table from "../../../components/table/Table.svelte";
  import type { TableProps } from "./../../../components/table/TableProps-types";

  export let data;

  let tableProps: TableProps = {
    titles: [],
    rows: [[]],
    hiddenColumns: []
  };

  $: if (data?.properties) {
    tableProps = createTableProps(data.properties);
    console.log("Updated tableProps:", tableProps);
  }

  function createTableProps(data: any): TableProps {
    const titles: string[] = [
      "sn",
      "property_Code",
      "property_Type",
      "allocated_Price",
      "price_Per_Unit",
      "dynamic_Price",
      "occupied",
      "created_On",
      "id", 
      "actions"
    ];

    const rows = data.map((item: any, i: number) => [
      i + 1,
      item.propertyCode,
      item.propertyType,
      item.allocatedPrice,
      item.pricePerUnit,
      item.dynamicPrice,
      item.occupied,
      item.createdOn,
      item.id,
    ]);
    const hiddenColumns = ["id"]

    return { titles, rows, hiddenColumns };
  }
</script>

<div class="container">
  <Button href="/api/property/create">Register Property</Button>
  <Table {tableProps} />
</div>
