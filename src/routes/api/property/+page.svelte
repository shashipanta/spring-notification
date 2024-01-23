<script lang="ts">
  import { Button, Spinner } from 'flowbite-svelte';
 
  import { onMount } from "svelte";
  import Table from "../../../components/table/Table.svelte";
  import type {TableProps} from "./../../../components/table/TableProps-types"

 

  export let properties = [];
  export let data;

  console.log("length : ", properties.length);
  let tableProps: TableProps = {
    titles: [],
    rows: [[]],
  };

  // let tableProps = {
  //   titles: ["property Name", "Property Location", "Property Price", "Edit"],
  //   rows:[
  //     ["someName", "some-location", "$Price", "action"],
  //     ["someName", "some-location", "$Price", "action"],
  //     ["someName", "some-location", "$Price", "action"],
  //     ["someName", "some-location", "$Price", "action"],
  //     ["someName", "some-location", "$Price", "action"],
  //     ["someName", "some-location", "$Price", "action"],
  //     ["someName", "some-location", "$Price", "action"],
  //     ["someName", "some-location", "$Price", "action"],
  //   ]
  // }

  onMount(() => {
    console.log("Property Information : ", data);
    tableProps = createTableProps(data.properties);
    console.log("Table Props : => ", data.properties)
  })
  
  function createTableProps(data: any) {

    let titleArr: [string] = [""];
    let finalRowArr = [[]];

    for(let i=0; i<data.length; i++) {

      let rowArr: any =[];

      console.log("Element : ", data[i]);
      console.log("Data : ", data);

      rowArr.push(data[i].id);
      rowArr.push(data[i].propertyCode);
      rowArr.push(data[i].propertyType);
      rowArr.push(data[i].allocatedPrice);
      rowArr.push(data[i].pricePerUnit);
      rowArr.push(data[i].dynamicPrice);
      rowArr.push(data[i].occupied);
      rowArr.push(data[i].createdOn);

      finalRowArr.push(rowArr);
    }

    titleArr.push("property_Code");
    titleArr.push("property_Type");
    titleArr.push("allocated_Price");
    titleArr.push("price_Per_Unit");
    titleArr.push("dynamic_Price");
    titleArr.push("occupied");
    titleArr.push("created_On");

    console.log("Title Arr", titleArr);
    console.log("rowArr", finalRowArr);
    

    let tp: TableProps = {
      titles: titleArr,
      rows: finalRowArr
    }

    return tp;
  }


</script>
<Button href="/api/property/create">Register Property</Button>
<!-- Property table -->

<Table tableProps={tableProps}/>