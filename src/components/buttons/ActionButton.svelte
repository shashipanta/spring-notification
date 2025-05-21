<script lang="ts">
    import { ActionType } from "$lib/global-types/ActionTypes";
    import { Button, Modal } from "flowbite-svelte";
    import { writable } from "svelte/store";

    
    function getActionType(action: string): String {
        let actionType: ActionType;
        switch (action) {
            case "delete":
            case ActionType.DELETE:
                actionType =  ActionType.DELETE;
                break;
            case "edit":
            case ActionType.EDIT:
                actionType = ActionType.EDIT;
                break;
            case "view":
            case ActionType.VIEW:
                actionType = ActionType.VIEW;
                break;
            case "add":
            case ActionType.ADD:
                actionType = ActionType.ADD;
                break;
            default:
                actionType = ActionType.PERFORM_ACTION;
                break;
        }

        console.log("Action Type: ", actionType);
        console.log("Passed Action Type: ", action);

        return actionType.split(/(?=[A-Z])/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toUpperCase())
            .join(" ");
    }

    export let actionConfig: {
        action: ActionType; // Action type (delete or other)
        id: string; // ID for the action (if applicable)
        url: string; // URL for the action (delete or other)
        confirmationMessage: string; // Confirmation message
        successMessage: string; // Success message
        failureMessage: string; // Failure message
        withConfirmation: boolean; // Control whether confirmation modal is shown
    };

    let showModal = writable(false);

    const handleClick = async () => {
        if (actionConfig.withConfirmation) {
            // Show confirmation modal for delete or other actions with confirmation
            showModal.set(true);
        } else {
            // Perform the action directly without confirmation
            await performAction();
        }
    };

    const handleConfirm = async () => {
        // Handle API call for delete or other actions
        const result = await performAction();
        if (result) {
            alert(actionConfig.successMessage);
        } else {
            alert(actionConfig.failureMessage);
        }
        showModal.set(false); // Close the modal after action
    };

    const performAction = async () => {
        try {
            const res = await fetch(actionConfig.url, {
                method: actionConfig.action === "delete" ? "DELETE" : "POST", 
                credentials: "include", // Include credentials for authentication
                body: JSON.stringify({ id: actionConfig.id }), // Pass ID if needed for the action
                
            });

            return res.ok;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
</script>

<!-- Button triggering the action -->
<Button color="red" on:click={handleClick} class="me-2">
    {getActionType(actionConfig.action)}
    {#if actionConfig.action === "delete"}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 me-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v1a1 1 0 001 1h12a1 1 0 001-1V5a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H6zm8.5 4a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h9zM7.25 7a.75.75 0 00-.75.75v7a.75.75 0 001.5 0v-7A.75.75 0 007.25 7zm4 .75a.75.75 0 00-.75-.75h-.25a.75.75 0 000 .25v7a.75.75 0 001.5-.25v-7z"
                clip-rule="evenodd"
            />
        </svg>
    {/if}
    {#if actionConfig.action === "edit"}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 me-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M17.707 2.293a1 1 0 00-1.414 0L3.586 13.586a1 1 0 00-.293.707V17a1 1 0 001 1h2.707a1 1 0 00.707-.293l12.707-12.707a1 1 0 000-1.414l-2-2zM4.414 16H5v-.586L15.586 4l.586-.586L16.414 4l-12.707 12.707A1 1 0 004.414 16z"
                clip-rule="evenodd"
            />
        </svg>
    {/if}
    {#if actionConfig.action === "view"}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 me-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M10 3a7 7 0 00-7 7c0 1.5.5 2.9 1.4 4.1l-.8.8a1 1 0 001.4 1.4l.8-.8A6.96 6.96 0 0010 17a7 7 0 000-14zm0 11a4 4 0 110-8 4 4 0 010 8z"
                clip-rule="evenodd"
            />
        </svg>
    {/if}
    {#if actionConfig.action === "add"}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 me-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M10 3a7 7 0 00-7 7c0 1.5.5 2.9 1.4 4.1l-.8.8a1 1 0 001.4 1.4l.8-.8A6.96 6.96 0 0010 17a7 7 0 000-14zm0 11a4 4 0 110-8 4 4 0 010 8z"
                clip-rule="evenodd"
            />
        </svg>
    {/if}
    {#if actionConfig.action === "other"}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 me-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M10 3a7 7 0 00-7 7c0 1.5.5 2.9 1.4 4.1l-.8.8a1 1 0 001.4 1.4l.8-.8A6.96 6.96 0 0010 17a7 7 0 000-14zm0 11a4 4 0 110-8 4 4 0 010 8z"
                clip-rule="evenodd"
            />
        </svg>
    {/if}
    {#if actionConfig.action === "performAction"}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 me-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M10 3a7 7 0 00-7 7c0 1.5.5 2.9 1.4 4.1l-.8.8a1 1 0 001.4 1.4l.8-.8A6.96 6.96 0 0010 17a7 7 0 000-14zm0 11a4 4 0 110-8 4 4 0 010 8z"
                clip-rule="evenodd"
            />
        </svg>
    {/if}
</Button>

{#if $showModal}
    <!-- Confirmation Modal for delete or other actions -->
    <Modal bind:open={$showModal} size="xs" autoclose>
        <div class="text-center">
            <h3
                class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
                {actionConfig.confirmationMessage}
            </h3>
            <div class="mt-4">
                <Button color="red" on:click={handleConfirm}
                    >Yes, I'm sure</Button
                >
                <Button
                    color="alternative"
                    on:click={() => showModal.set(false)}>No, cancel</Button
                >
            </div>
        </div>
    </Modal>
{/if}
