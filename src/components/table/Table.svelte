<script lang="ts">
    import { Button, Modal, Tooltip } from "flowbite-svelte";
    import { onMount } from "svelte";
    import type { TableProps } from "./TableProps-types";
    import {
        EditOutline,
        EyeOutline,
        TrashBinOutline,
    } from "flowbite-svelte-icons";
    import { goto } from "$app/navigation";

    import { ExclamationCircleOutline } from "flowbite-svelte-icons";
    import { slide } from "svelte/transition";

    let popupModal = false;

    export let tableProps: TableProps;

    onMount(() => {
        console.log("Table Props : ", tableProps);
    });

    function handleEdit(id: string) {
        console.log("Edit property with id : ", id);
        // Add your edit logic here
        goto(`/api/property/create?id=${id}`);
    }
    function handleView(id: string) {
        goto(`/api/property/${id}/view`);
    }

    function handleDeleteConfirmed(id: string) {}
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg" {tableProps}>
    <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
        <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <!-- Table headers -->
            <tr>
                {#each tableProps.titles as tableHead}
                    {#if !tableProps.hiddenColumns?.includes(tableHead)}
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                {tableHead}
                                <a href="#"
                                    ><svg
                                        class="w-3 h-3 ms-1.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                                        />
                                    </svg></a
                                >
                            </div>
                        </th>
                    {/if}
                {/each}
            </tr>
        </thead>
        <tbody>
            <!-- each sub array represents each row -->
            {#each tableProps.rows as row, rowCount}
                <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                    {#each row as data, index}
                        {#if tableProps.titles[index] !== "id"}
                            <td class="px-6 py-4">
                                <!-- {row[index]} -->
                                {data}
                            </td>
                        {/if}
                    {/each}
                    <!-- Action buttons -->
                    <td
                        class="px-6 py-4 flex items-center justify-center items gap-4"
                    >
                        <!-- Edit Icon -->
                        <Tooltip placement="top" triggeredBy="#editIcon"
                            >Edit</Tooltip
                        >
                        <EditOutline
                            id="editIcon"
                            class="w-5 h-5 cursor-pointer hover:text-gray-700"
                            on:click={() =>
                                handleEdit(
                                    String(
                                        row[tableProps.titles.indexOf("id")],
                                    ),
                                )}
                        />

                        <!-- View Icon -->
                        <Tooltip placement="top" triggeredBy="#viewIcon"
                            >View</Tooltip
                        >
                        <EyeOutline
                            id="viewIcon"
                            class="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
                            on:click={() =>
                                handleView(
                                    String(
                                        row[tableProps.titles.indexOf("id")],
                                    ),
                                )}
                        />

                        <!-- Delete Icon -->
                        <Tooltip placement="bottom" triggeredBy="#deleteIcon"
                            >Delete</Tooltip
                        >
                        <TrashBinOutline
                            id="deleteIcon"
                            class="w-5 h-5 cursor-pointer text-red-600 hover:text-red-700"
                            on:click={() => (popupModal = true)}
                        />
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<!-- Deletion confirmation Modal -->
<Modal bind:open={popupModal} size="xs" autoclose transition={slide}>
    <div class="text-center">
        <ExclamationCircleOutline
            class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
        />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
        </h3>
        <!-- Highlighted Subtext -->
        <span
            class="block text-sm font-semibold text-red-600 dark:text-red-500 mb-6"
        >
            There is no way back!!
        </span>
        <Button color="red" class="me-2" on:click={handleDeleteConfirmed}
            >Yes, I'm sure</Button
        >
        <Button color="alternative">No, cancel</Button>
    </div>
</Modal>
