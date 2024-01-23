
<script lang="ts">
  import { onMount } from "svelte";
    import type { TableProps } from "./TableProps-types";
    export let tableProps: TableProps;

    onMount(() => {
        console.log("Table Props : ", tableProps);
    })
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg" tableProps={tableProps}>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <!-- Table headers -->
            <tr>
                {#each tableProps.titles as tableHead}
                    <th scope="col" class="px-6 py-3">
                        <div class="flex items-center">
                            {tableHead}
                            <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/> </svg></a>
                        </div>
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            <!-- each sub array represents each row -->
            {#each tableProps.rows as row, index}
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {#each row as data, index}
                    <td class="px-6 py-4">
                        {row[index]}
                    </td>
                {/each}
            </tr>
            {/each}
                <!-- <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th> -->
                <!-- <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td> -->
        </tbody>
    </table>
</div>
